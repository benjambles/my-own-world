import Koa from 'koa';
import compress from 'koa-compress';
import conditionalGet from 'koa-conditional-get';
import etag from 'koa-etag';
import helmet from 'koa-helmet';
import koaJWT from 'koa-jwt';
import responseTime from 'koa-response-time';
import { resolve } from 'path';
import logger from 'koa-pino-logger';
import { errorHandler } from '../../shared-server/koa/error-handler';
import { jwtSecret } from '../config';
import { loadRoutes } from '../routing/load-routes';

/**
 * Initialize an app
 * @api public
 */
export const getMiddleware = (app: Koa): Koa.Middleware[] => {
    return [
        logger(),
        responseTime(), // Set response time header
        conditionalGet(),
        etag(), // Adds eTag headers to the response
        compress(), // ctx.compress = false to disable compression
        helmet(), // Security layer
        errorHandler(app),
        koaJWT({ secret: jwtSecret, passthrough: true }),
        ...loadRoutes(resolve(__dirname, '../resources'), 'api').map((route) => route.middleware()),
    ];
};
