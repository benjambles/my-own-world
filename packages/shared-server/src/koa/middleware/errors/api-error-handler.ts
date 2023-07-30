import Koa from 'koa';

/**
 * Centralised error handling logging. Additional middleware should not
 * try/catch on its own, unless it is rethrowing a modified error,
 * everything should be caught by this middleware.
 */
export function apiErrorHandler(app: Koa): Koa.Middleware {
    app.on('error', (err: Error, ctx: Koa.Context) => {
        /* centralized error handling:
         *   console.log error
         *   write error to log file
         *   save error and request information to database if ctx.request match condition
         */
        ctx.log.error(err);
    });

    return async (ctx, next) => {
        try {
            await next();
            if (ctx.status === 404) ctx.throw(404);
        } catch (err) {
            let parsedError;

            try {
                // Ugly but safe for when a non-JOI error is thrown
                parsedError = JSON.parse(err.message);
            } catch (e) {
                parsedError = err.message;
            }

            ctx.body = parsedError;
            ctx.status = err.status || 500;
            ctx.type = typeof parsedError === 'string' ? 'text' : 'json';

            ctx.app.emit('error', err, ctx);
        }
    };
}
