import * as fs from 'fs';
import * as responseTime from 'koa-response-time';
import * as compress from 'koa-compress';
import * as morgan from 'koa-morgan';
import * as Router from 'koa-router';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import errorHandler from 'koa-better-error-handler';
import * as conditionalGet from 'koa-conditional-get';
import * as etag from 'koa-etag';
import load from './lib/load';

const router: Router = new Router();
const env: string = process.env.NODE_ENV || 'development';
const accessLogStream: fs.WriteStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });

// Load routes into the router
load(router, __dirname + '/routes');
router.get('/404', ctx => ctx.throw(404));
router.get('/500', ctx => ctx.throw(500));

/**
 * Initialize an app
 * 
 * @return {Koa}
 * @api public
 */
export default function api(): Koa {
    const app: Koa = new Koa();

    // override koa's undocumented error handler
    app.context.onerror = errorHandler;

    // specify that this is our api
    app.context.api = true;

    // logging
    if ('test' != env) app.use(morgan('combined', { stream: accessLogStream }));

    // x-response-time
    app.use(responseTime());

    app.use(conditionalGet());
    app.use(etag());

    // compression
    app.use(compress());

    //app.use(koaJWT({ secret: jwtSecret }).unless({ path: [/^(?!\/api\/).*/] }));

    // Body parser only on certain methods
    app.use(async (ctx, next) => {
        if (~['put', 'post'].indexOf(ctx.method.toLowerCase())) ctx.disableBodyParser = true;
        await next();
    });

    app.use(bodyParser());

    // routing
    app
        .use(router.routes())
        .use(router.allowedMethods());

    // custom 404 handler since it's not already built in
    // custom 401 message to prevent JWT errors leaking to the user
    app.use(async (ctx, next) => {
        try {
            await next();
            if (ctx.status === 404)
                ctx.throw(404);
        } catch (err) {
            if (err.status && err.status === 401) {
                err.message = 'Protected resource, use a valid Authorization header to access this route\n';
            }
            ctx.throw(err);
            ctx.app.emit('error', err, ctx);
        }
    });

    return app;
}