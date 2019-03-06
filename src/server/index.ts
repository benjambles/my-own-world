import * as fs from 'fs';
import * as Koa from 'koa';
import * as compress from 'koa-compress';
import * as conditionalGet from 'koa-conditional-get';
import * as etag from 'koa-etag';
import * as helmet from 'koa-helmet';
import * as morgan from 'koa-morgan';
import * as responseTime from 'koa-response-time';
import * as path from 'path';
import * as koa404Handler from 'koa-404-handler';

import load from './utils/load';
import errorHandler = require('koa-better-error-handler');

const env: string = process.env.NODE_ENV || 'development';
const accessLogStream: fs.WriteStream = fs.createWriteStream(
    path.resolve(__dirname, 'access.log'),
    { flags: 'a' }
);

// Load routes into the router
let routers: iRouter[] = load(path.resolve(__dirname, 'api'), 'api');

/**
 * Initialize an app
 * @api public
 */
export default function api(): Koa {
    const app: Koa = new Koa();

    // override koa's undocumented error handler
    app.context.onerror = errorHandler;

    // specify that this is our api
    app.context.api = true;

    // logging
    if ('test' != env) app.use(morgan('combined', { stream: accessLogStream }));

    app.use(responseTime()); // Set response time header
    app.use(conditionalGet());
    app.use(etag()); // Adds eTag headers to the response
    app.use(compress()); // ctx.compress = false to disable compression
    app.use(helmet()); // Security layer
    app.use(koa404Handler);
    // routing
    routers.forEach(route => app.use(route.middleware()));

    return app;
}
