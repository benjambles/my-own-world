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
    staticPath?: Record<string, string>;
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
    staticPath,
    customErrorHandler,
}: GetMiddlewareProps): Koa.Middleware[] {
    return [
        setEnvOnState(env),
        logger(),
        conditionalGet(),
        etag(), // Adds eTag headers to the response
        compress(), // ctx.compress = false to disable compression
        helmet(helmetConfig), // Security layer
        customErrorHandler,
        koaJWT({ secret: env.JWT_SECRET, passthrough: true }),
        ...serveStatic(staticPath),
    ].filter(Boolean);
}

function serveStatic(staticPaths: GetMiddlewareProps['staticPath']) {
    if (!staticPaths) return [];

    return Object.entries(staticPaths).map(([prefix, path]) =>
        mount(`/${prefix}`, serve(path)),
    );
}
