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

interface GetMiddlewareProps {
    env: { JWT_SECRET: string };
    helmetConfig?: any;
    staticPaths?: Record<string, string>;
    customErrorHandler: Middleware;
}

/**
 * Returns an array of the base middleware for an application
 * TODO: Applications should be free to provide their own middleware
 * stack at a later date.
 * @param param0
 * @returns
 */
export function getMiddleware({
    env,
    helmetConfig,
    staticPaths,
    customErrorHandler,
}: GetMiddlewareProps): Koa.Middleware[] {
    return [
        logger(),
        conditionalGet(),
        etag(), // Adds eTag headers to the response
        compress(), // ctx.compress = false to disable compression
        setEnvOnState(env),
        helmet(helmetConfig), // Security layer
        customErrorHandler,
        koaJWT({ secret: env.JWT_SECRET, passthrough: true }),
        ...serveStatic(staticPaths),
    ].filter(Boolean);
}

function serveStatic(staticPaths: GetMiddlewareProps['staticPaths'] = {}) {
    return Object.entries(staticPaths).map(([prefix, path]) => {
        return mount(`/${prefix}`, serve(path));
    });
}
