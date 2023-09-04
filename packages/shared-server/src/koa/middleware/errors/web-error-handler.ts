import { RenderResult } from '@lit-labs/ssr';
import Koa, { Context } from 'koa';
import { TemplateResult } from 'lit';
import { streamResponse } from '../../../utils/routes/responses.js';

type ErrorCodes = '401' | '403' | '404' | '500';

type ErrorTemplates = {
    [key in ErrorCodes]: (data: any) => RenderProps;
};

export type StylesheetParams = { href: string; lazy?: boolean };
export type ScriptParams = { src: string; lazy?: string; type?: string };
export type RenderProps = {
    assets: {
        styles: StylesheetParams[];
        scripts: ScriptParams[];
    };
    template: TemplateResult<1> | TemplateResult<1>[];
};

type ErrorHandlerArgs<T> = {
    app: Koa;
    errorTemplates: ErrorTemplates;
    layoutComponent: (data: T, children: RenderProps) => RenderProps;
    layoutDataProvider?: (ctx: Context) => Promise<T>;
    renderer: (
        data: T,
        template: RenderProps,
    ) => Generator<string | Promise<RenderResult>, void, undefined>;
};

/**
 * Centralised error handling logging. Additional middleware should not
 * try/catch on its own, unless it is rethrowing a modified error,
 * everything should be caught by this middleware.
 */
export function webErrorHandler<T extends object>({
    app,
    errorTemplates,
    layoutComponent,
    renderer,
    layoutDataProvider,
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

            const page = await renderer(
                data,
                layoutComponent(
                    data,
                    errorTemplates[ctx.status]({
                        status,
                        error: parsedError,
                    }),
                ),
            );

            streamResponse(ctx, page, status);

            ctx.app.emit('error', err, ctx);
        }
    };
}
