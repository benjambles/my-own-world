import type { DotenvParseOutput } from 'dotenv/types';
import type Koa from 'koa';
import compress from 'koa-compress';
import conditionalGet from 'koa-conditional-get';
import etag from 'koa-etag';
import helmet from 'koa-helmet';
import koaJWT from 'koa-jwt';
import logger from 'koa-pino-logger';
import serve from 'koa-static';
import { errorHandler } from './error-handler.js';

interface GetMiddlewareProps {
    env: DotenvParseOutput;
    app: Koa;
    staticPath?: string;
    helmetConfig?: any;
}

/**
 * Returns an array of the base middleware for an application
 * TODO: Applications should be free to provide their own middleware
 * stack at a later date.
 * @param param0
 * @returns
 */
export function getMiddleware({
    app,
    env,
    staticPath,
    helmetConfig,
}: GetMiddlewareProps): Koa.Middleware[] {
    return [
        logger(),
        conditionalGet(),
        etag(), // Adds eTag headers to the response
        compress(), // ctx.compress = false to disable compression
        helmet(helmetConfig), // Security layer
        errorHandler(app),
        koaJWT({ secret: env.JWT_SECRET, passthrough: true }),
        staticPath ? serve(staticPath) : undefined,
    ].filter(Boolean);
}
