import { createWriteStream } from 'fs';
import Koa from 'koa';
import koa404Handler from 'koa-404-handler';
import errorHandler from 'koa-better-error-handler';
import compress from 'koa-compress';
import conditionalGet from 'koa-conditional-get';
import etag from 'koa-etag';
import helmet from 'koa-helmet';
import koaJWT from 'koa-jwt';
import morgan from 'koa-morgan';
import responseTime from 'koa-response-time';
import { resolve } from 'path';
import { equals, unless } from 'ramda';
import { jwtSecret } from './config';
import { loadRoutes } from './routing/load-routes';

/**
 * Initialize an app
 * @api public
 */
export const api = (app: Koa, env): Koa => {
    // override koa's undocumented error handler
    app.context.onerror = errorHandler;

    // specify that this is our api
    app.context.api = true;

    // logging
    unless(equals('test'), () => {
        app.use(
            morgan('combined', {
                stream: createWriteStream(resolve(__dirname, 'access.log'), {
                    flags: 'a',
                }),
            })
        );
    })(env);

    app.use(responseTime()); // Set response time header
    app.use(conditionalGet());
    app.use(etag()); // Adds eTag headers to the response
    app.use(compress()); // ctx.compress = false to disable compression
    app.use(helmet()); // Security layer
    app.use(koa404Handler);
    app.use(koaJWT({ secret: jwtSecret, passthrough: true }));

    // routing
    loadRoutes(resolve(__dirname, 'resources'), 'api').forEach((route) =>
        app.use(route.middleware())
    );

    return app;
};
