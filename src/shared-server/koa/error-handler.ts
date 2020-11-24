import Koa from 'koa';
import { KoaContext } from './app';

/**
 * Centralised error handling logging. Additional middleware should not
 * try/catch on its own, everything is caught by this middleware.
 */
export const errorHandler = (app: Koa): Koa.Middleware => {
    app.on('error', (err: Error, ctx: KoaContext) => {
        /* centralized error handling:
         *   console.log error
         *   write error to log file
         *   save error and request information to database if ctx.request match condition
         *   ...
         */
        ctx.log.error(err);
    });

    return async (ctx, next) => {
        try {
            await next();
            if (ctx.status === 404) ctx.throw(404);
        } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = err.message;
            ctx.app.emit('error', err, ctx);
        }
    };
};
