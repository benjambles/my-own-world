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
 * @param {Application} app
 * @param {String} root
 * @api private
 */

export = function load(router, root: string): void {
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
 * Define routes in `conf`.
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
