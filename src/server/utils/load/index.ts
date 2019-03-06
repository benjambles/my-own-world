/**
 * Module dependencies.
 */
import * as fs from 'fs';
import * as router from 'koa-joi-router';
import * as koaJWT from 'koa-jwt';
import { resolve } from 'path';
import * as R from 'ramda';
import { isFunction } from '../compares';
import { jwtSecret } from '../config';
import { catchErrors, setAccessRoles } from '../middleware';

const Joi = router.Joi;

/**
 * Load resources in `root` directory.
 *
 * @param root The path within which to search for route configs
 * @api private
 */
export default function load(root: string, prefix: string = ''): iRouter[] {
    const ifIsRouter = R.ifElse(R.propIs(Function, 'middleware'));
    const getRouter = R.partial(generateRouter, [root, prefix]);
    return fs.readdirSync(root).reduce((acc, filePath: string) => {
        const router = getRouter(filePath);
        return ifIsRouter(val => R.concat(acc, [val]), R.always(acc))(router);
    }, []);
}

/**
 * Generate a router for the matched directory
 * @param root The path within which to search for route configs
 * @param name The name of the current directory
 */
function generateRouter(root: string, prefix: string, name: string): iRouter {
    const filePath: string = resolve(root, name);
    const stats: fs.Stats = fs.lstatSync(filePath);

    if (!stats.isDirectory()) return;

    const { paths } = require(resolve(filePath, 'config.json'));
    const { routeHandlers } = require(filePath);

    return router()
        .route(mapRoutes(paths, routeHandlers))
        .prefix(`/${prefix}`);
}

/**
 * Map routes onto the router through configuration
 * @param paths A configuration object for a route loaded from a json file
 * @param routeHandlers The functions to be used as the final middleware for the routes
 */
function mapRoutes(paths, routeHandlers) {
    const dfs = (stack: any[], head) => R.propOr([], 'paths', head).concat(stack);

    const loop = (acc: any[], stack: any[]) => {
        if (!stack.length) return acc;

        const [head, ...tail] = stack;
        const mappedRoutes = mapMethods(head.route, head.verbs, routeHandlers);

        return loop(R.concat(acc, mappedRoutes), dfs(tail, head));
    };

    return loop([], paths);
}

/**
 * Maps an object containing swagger and joi docs into a JOI route object
 * @param path A string representing the path of an URI, using :varName for variables
 * @param verbs An object containing http verbs and the swagger/joi docs describing them
 * @param routeHandlers An object containing the handlers to map to the routes
 */
function mapMethods(path: string, verbs: object, routeHandlers: object) {
    return Object.entries(verbs).reduce((acc, [method, spec]): joiRoute[] => {
        const handler = mapHandlers(spec, routeHandlers);

        if (handler.length) {
            acc.push({
                method,
                path,
                handler,
                validate: buildJoiSpec(spec),
                meta: R.pick(['summary', 'description'], spec)
            });
        }

        return acc;
    }, []);
}

/**
 * Returns an array of middleware to be used by the route
 * @param spec The swagger configuration for a single route
 * @param routeHandlers object of functions that can be mapped to a route
 */
function mapHandlers(spec, routeHandlers): Function[] {
    if (!isFunction(routeHandlers[spec.operationId])) return [];

    // return spec.security
    //     .reduce(
    //         (acc, item) =>
    //             R.ifElse(R.isNil, R.always(acc), val =>
    //                 R.concat(acc, [koaJWT({ secret: jwtSecret }), setAccessRoles(val)])
    //             )(R.propOr(null, 'jwt', item)),
    //         []
    //     )
    //     .concat([catchErrors, routeHandlers[spec.operationId], routeHandlers.checkAccess]);

    return spec.security
        .reduce((acc, item) => {
            if (Object.keys(item).includes('jwt')) {
                return acc.concat([koaJWT({ secret: jwtSecret }), setAccessRoles(item.jwt)]);
            }

            return acc;
        }, [])
        .concat([catchErrors, routeHandlers[spec.operationId], routeHandlers.checkAccess]);
}

/**
 * Creates the validate spec object required by JOI routers
 * Converts:
 * {
 *  "name": "email",
 *  "in": "body",
 *  "description": "The email address of the user wishing to log in",
 *  "required": true,
 *  "type": "string".
 *  "opts": {
 *      "lowercase": true,
 *      "email": true
 *  }
 * }
 *
 * In to:
 * email: Joi.string().required().lowercase().email()
 *
 *
 * @param config
 */
function buildJoiSpec(config) {
    const { parameters = [], consumes = [] } = config;

    const spec = parameters.reduce(
        (acc, paramConf: swaggerParam) =>
            R.assocPath(R.props(['in', 'name'], paramConf), buildParameter(paramConf), acc),
        { continueOnError: true }
    );

    if (R.prop('body', spec) && Array.isArray(consumes)) {
        spec.type = R.head(consumes).split('/')[1];
    }

    return spec;
}

/**
 * Converts a swagger parameter definition into a Joi validation schema
 * @param paramConf Swagger parameter definition
 */
function buildParameter(paramConf: swaggerParam): Function {
    const { type, values, format, opts = {} } = paramConf;
    const hasChildren = R.equals(type, 'array') && Array.isArray(values);
    const childValidators = hasChildren ? R.map(buildParameter, values) : null;
    const validators = {
        [swaggerToJoiType(type)]: true,
        ...(format ? { [swaggerToJoiType(format)]: true } : {}),
        ...opts,
        ...(hasChildren ? { items: childValidators } : {})
    };

    return R.reduce(
        (acc, [name, value]) => (value === true ? acc[name]() : acc[name](value)),
        Joi,
        Object.entries(validators)
    );
}

/**
 * Converts swagger parameter types to JOI validation types
 * @param type
 */
function swaggerToJoiType(type: string): string {
    return R.cond([
        [R.equals('token'), R.always('string')],
        [R.equals('integer'), R.always('number')],
        [R.equals('int64'), R.always('integer')],
        [R.T, _type => '' + _type]
    ])(type);
}
