import Koa, { Context } from 'koa';
import { parseJson } from '../../../utils/data/json.js';
import { streamResponse } from '../../../utils/routes/responses.js';

type ErrorCodes = '401' | '403' | '404' | '500';

type TemplatePaths = {
    [key in ErrorCodes]: string;
};

type Renderer = (data: any, rootComponent: string) => Promise<any>;

/**
 * Centralised error handling logging. Additional middleware should not
 * try/catch on its own, unless it is rethrowing a modified error,
 * everything should be caught by this middleware.
 */
export function webErrorHandler(
    app: Koa,
    templatePaths: TemplatePaths,
    renderer: Renderer,
    staticData?: (ctx: Context) => Promise<any>,
): Koa.Middleware {
    app.on('error', (err: Error, ctx: Koa.Context) => {
        /* centralized error handling:
         *   console.log error
         *   write error to log file
         *   save error and request information to database if ctx.request match condition
         *   ...
         */
        ctx.log.error(err);
    });

    return async (ctx: Koa.Context, next) => {
        try {
            await next();
            if (ctx.status === 404) ctx.throw(404);
        } catch (err) {
            const status = err.status || 500;
            const data = await staticData?.(ctx);

            const renderData = {
                ...data,
                error: parseJson(err.message).getOrElseValue(err.message),
                status,
            };

            const page = await renderer(renderData, templatePaths[ctx.status]);
            streamResponse(ctx, page, status);

            ctx.app.emit('error', err, ctx);
        }
    };
}
