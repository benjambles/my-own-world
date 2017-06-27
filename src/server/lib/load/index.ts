/**
 * Module dependencies.
 */

import * as createDebug from 'debug';
import * as path from 'path';
import * as fs from 'fs';
import * as koaJWT from 'koa-jwt';
import { jwtSecret } from '../../lib/constants';

const join = path.resolve;
const readdir = fs.readdirSync;
const debug = createDebug('api');

/**
 * Load resources in `root` directory.
 *
 * @param router A koa router instance to map paths onto
 * @param root The path within which to search for route configs
 * @api private
 */

export default function load(router, root: string): void {
    readdir(root).forEach(function loadConfig(file): void {
        const dir = join(root, file);
        const stats = fs.lstatSync(dir);
        if (stats.isDirectory()) {
            const conf = require(join(dir, 'config.json'));
            conf.name = file;
            conf.directory = dir;
            generateRoutes(router, conf);
        }
    });
};

/**
 * Map routes onto the router through configuration
 * @param router A koa router instance to map paths onto
 * @param conf A configuration object for a route loaded from a json file
 */

function generateRoutes(router, conf): void {
    debug('routes: %s', conf.info.name);

    const mod = require(conf.directory);
    const routeFunctions = require(conf.directory);

    Object.entries(conf.paths).forEach(([path, methods]) => {
        Object.entries(methods).forEach(([method, spec]) => {
            let middleware = [routeFunctions[spec.operationId]];

            spec.security.forEach((item) => {
                if (~Object.keys(item).indexOf('jwt')) {
                    middleware = [koaJWT({ secret: jwtSecret }), ...middleware];
                }
            });

            router[method](path, ...middleware);
        });
    });
}
