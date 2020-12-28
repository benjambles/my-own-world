import Koa from 'koa';
import compress from 'koa-compress';
import conditionalGet from 'koa-conditional-get';
import etag from 'koa-etag';
import helmet from 'koa-helmet';
import koaJWT from 'koa-jwt';
import logger from 'koa-pino-logger';
import responseTime from 'koa-response-time';
import { errorHandler } from '../../shared-server/koa/error-handler';
import { getRouteMiddleware } from './routing/get-route-middleware';

/**
 * Initialize an app
 * @api public
 */
export const getMiddleware = (env, app: Koa, routeHandlers): Koa.Middleware[] => {
    return [
        logger(),
        responseTime(), // Set response time header
        conditionalGet(),
        etag(), // Adds eTag headers to the response
        compress(), // ctx.compress = false to disable compression
        helmet(), // Security layer
        errorHandler(app),
        koaJWT({ secret: env.JWT_SECRET, passthrough: true }),
        ...getRouteMiddleware(routeHandlers),
    ];
};
