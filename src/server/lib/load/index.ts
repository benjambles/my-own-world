/**
 * Module dependencies.
 */

import * as createDebug from 'debug';
import * as path from 'path';
import * as fs from 'fs';
import * as koaJWT from 'koa-jwt';
import { jwtSecret } from '../../lib/constants';
import * as router from 'koa-joi-router';
import { flatten } from '../../lib/utils';
import * as Joi from 'joi';

const join = path.resolve;
const readdir = fs.readdirSync;
const debug = createDebug('api');

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
            Object.entries(methods).map(([method, spec]) => {
                let validate = buildJoiSpec(spec);
                let handler: Function[] = [routeFunctions[spec.operationId]];

                spec.security.forEach((item) => {
                    if (~Object.keys(item).indexOf('jwt')) {
                        handler = [koaJWT({ secret: jwtSecret }), ...handler];
                    }
                });

                return { method, path, validate, handler };
            })
        )
    );
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
 * email: Joi.string().lowercase().email()
 * 
 * @param config 
 */
function buildJoiSpec(config) {
    const spec = {};

    config.parameters.forEach(function (paramConf: swaggerParam) {
        if (!spec[paramConf.in]) {
            spec[paramConf.in] = {}; // create the key if it doesn't exist
        }

        let loc = spec[paramConf.in];

        loc[paramConf.name] = buildParameter(paramConf);
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

    if (paramConf.opts) {
        Object.entries(paramConf.opts).forEach(([key, value]) => {
            if (value === true) {
                validator = validator[key]();
            } else {
                validator = validator[key](value);
            }
        });
    }

    if (paramConf.required) {
        validator = validator.required();
    }

    return validator;
}

function swaggerToJoiType(type): string {
    switch (type) {
        case 'token':
            return 'string';
        case 'integer':
            return 'number';
        default:
            return type;
    }
}

/**
 * Checks to see if the object being passed in has the interface of a router object.
 * @param mappedRouter A router instance or undefined
 */
function isRouter(mappedRouter): boolean {
    return (mappedRouter && typeof mappedRouter.middleware === 'function');
}
