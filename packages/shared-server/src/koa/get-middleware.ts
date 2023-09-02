import Koa, { Middleware } from 'koa';
import compress from 'koa-compress';
import conditionalGet from 'koa-conditional-get';
import etag from 'koa-etag';
import helmet from 'koa-helmet';
import koaJWT from 'koa-jwt';
import mount from 'koa-mount';
import logger from 'koa-pino-logger';
import serve from 'koa-static';
import { setEnvOnState } from './middleware/set-env-on-state.js';
import cors from '@koa/cors';

interface GetMiddlewareProps {
    corsConfig?: { origin: string };
    customErrorHandler: Middleware;
    env: { JWT_SECRET: string };
    isApi: boolean;
    helmetConfig?: any;
    staticPaths?: Record<string, string>;
}

/**
 * Returns an array of the base middleware for an application
 * TODO: Applications should be free to provide their own middleware
 * stack at a later date.
 * @param param0
 * @returns
 */
export function getMiddleware({
    customErrorHandler,
    env,
    isApi,
    helmetConfig,
    corsConfig,
    staticPaths,
}: GetMiddlewareProps): Koa.Middleware[] {
    return [
        logger(),
        conditionalGet(),
        etag(), // Adds eTag headers to the response
        compress(), // ctx.compress = false to disable compression
        setEnvOnState(env),
        helmet(helmetConfig), // Security layer
        cors(corsConfig),
        customErrorHandler,
        koaJWT({
            secret: env.JWT_SECRET,
            passthrough: true,
            cookie: isApi ? undefined : 'mow_auth',
        }),
        ...serveStatic(staticPaths),
    ].filter(Boolean);
}

function serveStatic(staticPaths: GetMiddlewareProps['staticPaths'] = {}) {
    return Object.entries(staticPaths).map(([prefix, path]) => {
        return mount(`/${prefix}`, serve(path));
    });
}
