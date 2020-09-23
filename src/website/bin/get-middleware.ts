import { createWriteStream } from 'fs';
import { Middleware } from 'koa';
import koa404Handler from 'koa-404-handler';
import compress from 'koa-compress';
import conditionalGet from 'koa-conditional-get';
import etag from 'koa-etag';
import helmet from 'koa-helmet';
import koaJWT from 'koa-jwt';
import morgan from 'koa-morgan';
import responseTime from 'koa-response-time';
import serve from 'koa-static';
import { resolve } from 'path';
import { equals, ifElse } from 'ramda';
import { jwtSecret } from '../config';
import { getRoutes } from '../routes/get-routes';

/**
 * Initialize an app
 * @api public
 */
export const getMiddleware = (env: string): Middleware[] => {
    // logging
    const logging = ifElse(
        equals('test'),
        () => [
            morgan('combined', {
                stream: createWriteStream(resolve(__dirname, 'access.log'), {
                    flags: 'a',
                }),
            }),
        ],
        () => []
    )(env);

    return [
        ...logging,
        responseTime(), // Set response time header
        conditionalGet(),
        etag(), // Adds eTag headers to the response
        compress(), // ctx.compress = false to disable compression
        helmet(), // Security layer
        koa404Handler,
        koaJWT({ secret: jwtSecret, passthrough: true }),
        serve(resolve(__dirname, '../../ui/static')),
        ...getRoutes().map((route) => route.middleware()),
    ];
};
