/**
 * Module dependencies.
 */
import * as fs from "fs";
import * as Joi from "joi";
import * as Koa from "koa";
import * as router from "koa-joi-router";
import * as koaJWT from "koa-jwt";
import * as path from "path";

import { flatten, deepFlatten } from "../";
import { jwtSecret } from "../config";
import { catchErrors, setAccessRoles } from "../middleware";
import { isNil } from "../";

/**
 * Load resources in `root` directory.
 *
 * @param root The path within which to search for route configs
 * @api private
 */

export default function load(root: string, prefix: string = ""): iRouter[] {
    return fs
        .readdirSync(root)
        .map((filePath: string) => generateRouter(root, filePath, prefix))
        .filter(isRouter);
}

/**
 * Generate a router for the matched directory
 * @param root The path within which to search for route configs
 * @param name The name of the current directory
 */
function generateRouter(root: string, name: string, prefix: string = ""): iRouter {
    const filePath: string = path.resolve(root, name);
    const stats: fs.Stats = fs.lstatSync(filePath);

    if (!stats.isDirectory()) {
        return;
    }

    const conf = require(path.resolve(filePath, "config.json"));
    const routeHandlers = require(filePath);
    const mappedRouter = router()
        .route(mapRoutes(conf.paths, routeHandlers))
        .prefix(`/${prefix}`);

    return mappedRouter;
}

/**
 * Map routes onto the router through configuration
 * @param paths A configuration object for a route loaded from a json file
 * @param routeHandlers The functions to be used as the final middleware for the routes
 */
function mapRoutes(paths, routeHandlers) {
    const dfs = (stack, head) => (head.paths || []).concat(stack);

    const loop = (acc, stack) => {
        if (stack.length === 0) {
            return acc;
        }

        const [head, ...tail] = stack;
        const mappedRoutes = mapMethods(head.route, head.verbs, routeHandlers).filter(
            route => !isNil(route)
        );

        return loop(acc.concat(mappedRoutes), dfs(tail, head));
    };

    return loop([], paths);
}

/**
 * Maps an object containing swagger and joi docs into a JOI route object
 * @param route A string representing the path of an URI, using :varName for variables
 * @param verbs An object containing http verbs and the swagger/joi docs describing them
 * @param routeHandlers An object containing the handlers to map to the routes
 */
function mapMethods(route: string, verbs: object, routeHandlers: object) {
    return Object.entries(verbs).map(([method, spec]): joiRoute => {
        const handler = mapHandlers(spec, routeHandlers);

        if (!handler.length) return null;

        const validate = buildJoiSpec(spec);
        const meta = {
            summary: spec.summary,
            description: spec.description
        };

        return { method, path: route, validate, handler, meta };
    });
}

/**
 * Returns an array of middleware to be used by the route
 * @param spec The swagger configuration for a single route
 * @param routeHandlers object of functions that can be mapped to a route
 */
function mapHandlers(spec, routeHandlers): Function[] {
    return typeof routeHandlers[spec.operationId] === "function"
        ? bindSecurity(spec.security).concat([
              catchErrors,
              routeHandlers[spec.operationId],
              routeHandlers.checkAccess
          ])
        : [];
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
 * @param config
 */
function buildJoiSpec(config) {
    const spec = {
        continueOnError: true
    };

    if (config.parameters.length) {
        config.parameters.forEach(function(paramConf: swaggerParam) {
            if (!spec[paramConf.in]) {
                spec[paramConf.in] = {}; // create the key if it doesn't exist
            }

            spec[paramConf.in][paramConf.name] = buildParameter(paramConf);
        });
    }

    if (spec["body"]) {
        spec["type"] = config.consumes[0].split("/")[1];
    }

    return spec;
}

/**
 * Converts a swagger parameter definition into a Joi validation schema
 * @param paramConf Swagger parameter definition
 */
function buildParameter(paramConf: swaggerParam) {
    let validator = Joi[swaggerToJoiType(paramConf.type)]();

    if (paramConf.format) {
        validator = validator[swaggerToJoiType(paramConf.format)]();
    }

    if (paramConf.required) {
        validator = validator.required();
    }

    if (paramConf.opts) {
        Object.entries(paramConf.opts).forEach(([key, value]) => {
            if (value === true) {
                validator = validator[key]();
            } else {
                validator = validator[key](value);
            }
        });
    }

    return validator;
}

/**
 * Converts swagger parameter types to JOI validation types
 * @param type
 */
function swaggerToJoiType(type: string): string {
    switch (type) {
        case "token":
            return "string";
        case "integer":
            return "number";
        case "int64":
            return "integer";
        default:
            return "" + type;
    }
}

/**
 * Checks to see if the object being passed in has the interface of a router object.
 * @param mappedRouter A router instance or undefined
 */
function isRouter(mappedRouter): boolean {
    return mappedRouter && typeof mappedRouter.middleware === "function";
}

/**
 *
 * @param security
 */
function bindSecurity(security: any[]): Koa.Middleware[] {
    return security
        .map(item => {
            const handlers: Koa.Middleware[] = [];

            if (Object.keys(item).includes("jwt")) {
                handlers.push(koaJWT({ secret: jwtSecret }), setAccessRoles(item.jwt));
            }

            return handlers;
        })
        .reduce(flatten, []);
}
