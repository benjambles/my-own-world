import { errorHandler } from '@benjambles/mow-server/lib/koa/error-handler.js';
import type Koa from 'koa';
import compress from 'koa-compress';
import conditionalGet from 'koa-conditional-get';
import etag from 'koa-etag';
import helmet from 'koa-helmet';
import koaJWT from 'koa-jwt';
import logger from 'koa-pino-logger';

/**
 * Initialize an app
 * @api public
 */
export const getMiddleware = (env, app: Koa, routeHandlers): Koa.Middleware[] => {
    return [
        logger(),
        conditionalGet(),
        etag(), // Adds eTag headers to the response
        compress(), // ctx.compress = false to disable compression
        helmet(), // Security layer
        errorHandler(app),
        koaJWT({ secret: env.JWT_SECRET, passthrough: true }),
        ...routeHandlers.map((route) => route.middleware()),
    ];
};
