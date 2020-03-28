import * as fs from 'fs';
import * as Koa from 'koa';
import * as koa404Handler from 'koa-404-handler';
import * as compress from 'koa-compress';
import * as conditionalGet from 'koa-conditional-get';
import * as etag from 'koa-etag';
import * as helmet from 'koa-helmet';
import * as koaJWT from 'koa-jwt';
import * as morgan from 'koa-morgan';
import * as responseTime from 'koa-response-time';
import * as path from 'path';
import { equals, unless } from 'ramda';
import { jwtSecret } from './config';
import routes from './routes';
import * as errorHandler from 'koa-better-error-handler';

/**
 * Initialize an app
 * @api public
 */
export default function run(env): Koa {
    const app: Koa = new Koa();

    // override koa's undocumented error handler
    app.context.onerror = errorHandler;

    // specify that this is our api
    app.context.api = false;

    // logging
    unless(equals('test'), () => {
        app.use(
            morgan('combined', {
                stream: fs.createWriteStream(path.resolve(__dirname, 'access.log'), { flags: 'a' }),
            })
        );
    })(env);

    app.use(responseTime()); // Set response time header
    app.use(conditionalGet());
    app.use(etag()); // Adds eTag headers to the response
    app.use(compress()); // ctx.compress = false to disable compression
    app.use(helmet()); // Security layer
    app.use(koa404Handler);
    app.use(koaJWT({ secret: jwtSecret, passthrough: true }));

    // routing
    routes.forEach(route => app.use(route.middleware()));

    return app;
}
