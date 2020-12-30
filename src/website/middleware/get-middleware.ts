import { renderToString } from '@popeindustries/lit-html-server';
import { DotenvParseOutput } from 'dotenv/types';
import Koa from 'koa';
import compress from 'koa-compress';
import conditionalGet from 'koa-conditional-get';
import etag from 'koa-etag';
import helmet from 'koa-helmet';
import router from 'koa-joi-router';
import koaJWT from 'koa-jwt';
import logger from 'koa-pino-logger';
import responseTime from 'koa-response-time';
import serve from 'koa-static';
import { resolve } from 'path';
import { errorHandler } from '@sharedServer/koa/error-handler';
import { SERVER_CONTEXT } from '@ui/utils/templates/server-context';
import { getRouteMiddleware } from './routing/get-route-middleware';

/**
 * Initialize an app
 * @api public
 */
export const getMiddleware = (env: DotenvParseOutput, app: Koa, routes): Koa.Middleware[] => {
    return [
        logger(),
        responseTime(), // Set response time header
        conditionalGet(),
        etag(), // Adds eTag headers to the response
        compress(), // ctx.compress = false to disable compression
        helmet({
            contentSecurityPolicy: {
                directives: {
                    'default-src': ['*'],
                    'script-src-attr': ["'unsafe-inline'"],
                    'upgrade-insecure-requests': [],
                },
            },
        }), // Security layer
        errorHandler(app),
        koaJWT({ secret: env.JWT_SECRET, passthrough: true }),
        serve(resolve(__dirname, '../../ui/static')),
        ...getRouteMiddleware({
            router: router(),
            routes,
            renderContext: SERVER_CONTEXT,
            renderToString,
        }),
    ];
};
