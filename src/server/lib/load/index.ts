/**
 * Module dependencies.
 */

import createDebug = require('debug');
import path = require('path');
import fs = require('fs');

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
            router[method](path, routeFunctions[spec.operationId]);
        });
    });
}
