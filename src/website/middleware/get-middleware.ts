import { renderToString } from '@popeindustries/lit-html-server';
import type { DotenvParseOutput } from 'dotenv/types';
import type Koa from 'koa';
import compress from 'koa-compress';
import conditionalGet from 'koa-conditional-get';
import etag from 'koa-etag';
import helmet from 'koa-helmet';
import router from 'koa-joi-router';
import koaJWT from 'koa-jwt';
import logger from 'koa-pino-logger';
import serve from 'koa-static';
import { resolve } from 'path';
import { errorHandler } from '../../shared-server/koa/error-handler.js';
import { getDirPath } from '../../shared-server/utils/get-dir-path.js';
import { SERVER_CONTEXT } from '../../ui/utils/templates/server-context.js';
import { getRouteMiddleware } from './routing/get-route-middleware.js';

/**
 * Initialize an app
 * @api public
 */
export function getMiddleware(env: DotenvParseOutput, app: Koa, routes): Koa.Middleware[] {
    const modulePath = getDirPath(import.meta.url);

    return [
        logger(),
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
        serve(resolve(modulePath, '../../ui/static')),
        ...getRouteMiddleware({
            router: router(),
            routes,
            renderContext: SERVER_CONTEXT,
            renderToString,
        }),
    ];
}
