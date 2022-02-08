import { errorHandler } from '@benjambles/mow-server/dist/koa/error-handler.js';
import type { DotenvParseOutput } from 'dotenv/types';
import type Koa from 'koa';
import compress from 'koa-compress';
import conditionalGet from 'koa-conditional-get';
import etag from 'koa-etag';
import helmet from 'koa-helmet';
import router, { Spec } from 'koa-joi-router';
import koaJWT from 'koa-jwt';
import { nodeResolve } from 'koa-node-resolve';
import logger from 'koa-pino-logger';
import serve from 'koa-static';

interface GetMiddlewareProps {
    env: DotenvParseOutput;
    app: Koa;
    routes: Spec[];
    staticPath: string;
}

/**
 * Initialize an app
 * @api public
 */
export function getMiddleware({
    env,
    app,
    routes,
    staticPath,
}: GetMiddlewareProps): Koa.Middleware[] {
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
        nodeResolve({}),
        serve(staticPath),
        router().route(routes).middleware(),
    ];
}
