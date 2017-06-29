/**
 * Module dependencies.
 */

import * as path from 'path';
import * as fs from 'fs';
import * as koaJWT from 'koa-jwt';
import * as Koa from 'koa';
import { jwtSecret } from '../../lib/constants';
import * as router from 'koa-joi-router';
import { flatten } from '../../lib/utils';
import * as Joi from 'joi';

const join = path.resolve;
const readdir = fs.readdirSync;

/**
 * Load resources in `root` directory.
 *
 * @param root The path within which to search for route configs
 * @api private
 */

export default function load(root: string): iRouter[] {
    return readdir(root)
        .map((path: string) => generateRouter(root, path))
        .filter(isRouter);
};

/**
 * Generate a router for the matched directory
 * @param root The path within which to search for route configs
 * @param name The name of the current directory
 */
function generateRouter(root: string, name: string): iRouter {
    const path: string = join(root, name);
    const stats: fs.Stats = fs.lstatSync(path);

    if (stats.isDirectory()) {
        const conf = require(join(path, 'config.json'));
        const routeFunctions = require(path);
        const mappedRouter = router().route(generateRoutes(conf, routeFunctions));

        mappedRouter.prefix('/api');

        return mappedRouter;
    }

    return;
}

/**
 * Map routes onto the router through configuration
 * @param conf A configuration object for a route loaded from a json file
 * @param routeFunctions The functions to be used as the final middleware for the routes
 */

function generateRoutes(conf, routeFunctions): joiRoute[] {
    return flatten(
        Object.entries(conf.paths).map(([path, methods]) =>
            Object.entries(methods).map(([method, spec]): joiRoute => {
                const validate = buildJoiSpec(spec);
                const meta = {
                    summary: spec.summary,
                    description: spec.description
                };

                const handler = mapHandlers(spec, routeFunctions);

                return { method, path, validate, handler, meta };
            })
        )
    );
}

/**
 * Returns an array of middleware to be used by the route
 * @param spec The swagger configuration for a single route
 * @param routeFunctions object of functions that can be mapped to a route
 */
function mapHandlers(spec, routeFunctions): Function[] {
    return flatten(spec.security.map((item) => {
        const handlers = [];

        if (~Object.keys(item).indexOf('jwt')) {
            handlers.push(koaJWT({ secret: jwtSecret }));
        }

        return handlers;
    })).concat([catchErrors, routeFunctions[spec.operationId]]);
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

    config.parameters.forEach(function (paramConf: swaggerParam) {
        if (!spec[paramConf.in]) {
            spec[paramConf.in] = {}; // create the key if it doesn't exist
        }

        spec[paramConf.in][paramConf.name] = buildParameter(paramConf);
    });

    if (spec['body']) {
        spec['type'] = config.consumes[0].split('/')[1];
    }

    return spec;
}

/**
 * Converts a swagger parameter definition into a Joi validation schema
 * @param paramConf Swagger parameter definition
 */
function buildParameter(paramConf: swaggerParam) {
    let type = swaggerToJoiType(paramConf.type);
    let validator = Joi[type]();

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
        case 'token':
            return 'string';
        case 'integer':
            return 'number';
        default:
            return '' + type;
    }
}

/**
 * Checks to see if the object being passed in has the interface of a router object.
 * @param mappedRouter A router instance or undefined
 */
function isRouter(mappedRouter): boolean {
    return (mappedRouter && typeof mappedRouter.middleware === 'function');
}

/**
 * Custom error handling middleware to format JOI errors into JSON errors instead of default text.
 * @param ctx Koa context
 * @param next Next middleware to call if validation passes
 */
async function catchErrors(ctx: Koa.Context, next): Promise<any> {
    if (ctx.invalid) {
        let message = {};

        Object
            .entries(ctx.invalid)
            .forEach(([k, v]) => {
                if (!v.details) {
                    message[k] = v.msg;
                    return;
                }

                message[k] = v.details.map((err) => ({
                    error: err.message,
                    field: err.path
                }));
            });

        ctx.throw(JSON.stringify(message), 400);
    }

    await next();
}
