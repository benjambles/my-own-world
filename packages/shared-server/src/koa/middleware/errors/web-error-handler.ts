import { RenderResult } from '@lit-labs/ssr';
import Koa, { Context } from 'koa';
import { streamResponse } from '../../../utils/routes/responses.js';
import { RenderProps } from '../../../utils/web-rendering/render-template.js';

type ErrorCodes = '400' | '401' | '403' | '405' | '404' | '500';

type ErrorTemplates = {
    [key in ErrorCodes]: (data: ErrorData) => RenderProps;
};

type ErrorHandlerArgs<T> = {
    app: Koa;
    errorTemplates: ErrorTemplates;
    layoutComponent: (children: RenderProps) => RenderProps;
    layoutDataProvider?: (ctx: Context) => Promise<T>;
    loginPath: string;
    renderer: (
        data: T,
        template: RenderProps,
    ) => Generator<string | Promise<RenderResult>, void, undefined>;
};

export type ErrorData = {
    error: string | object;
    status: string;
};

/**
 * Centralised error handling logging. Additional middleware should not
 * try/catch on its own, unless it is rethrowing a modified error,
 * everything should be caught by this middleware.
 */
export function webErrorHandler<T extends object>({
    app,
    errorTemplates,
    loginPath,
    layoutComponent,
    layoutDataProvider,
    renderer,
}: ErrorHandlerArgs<T>): Koa.Middleware {
    app.on('error', (err: Error, ctx: Koa.Context) => {
        /* centralized error handling:
         *   console.log error
         *   write error to log file
         *   save error and request information to database if ctx.request match condition
         */
        ctx.log.error(err);
    });

    return async (ctx: Koa.Context, next) => {
        try {
            await next();
            if (ctx.status === 404) ctx.throw(404);
        } catch (err) {
            const status = err.status || 500;
            const data = await layoutDataProvider?.(ctx);

            let parsedError;

            try {
                // Ugly but safe for when a non-JOI error is thrown
                parsedError = JSON.parse(err.message);
            } catch (e) {
                parsedError = err.message;
            }

            ctx.app.emit('error', err, ctx);

            if (err.status === 401 && err.message === 'jwt must be provided') {
                ctx.redirect(loginPath || '/');
                return;
            }

            const errorTemplate = errorTemplates[err.status] ?? errorTemplates['500'];

            const page = await renderer(
                data,
                layoutComponent(
                    errorTemplate({
                        status,
                        error: parsedError,
                    }),
                ),
            );

            streamResponse(ctx, page, status);
        }
    };
}
