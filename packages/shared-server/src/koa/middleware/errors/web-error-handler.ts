import { RenderResult } from '@lit-labs/ssr';
import Koa, { Context } from 'koa';
import { TemplateResult } from 'lit';
import { streamResponse } from '../../../utils/routes/responses.js';

type ErrorCodes = '401' | '403' | '404' | '500';

type TemplateParams = {
    assets: {
        styles: { href: string; lazy?: boolean }[];
        scripts: { src: string; async?: boolean; defer?: boolean }[];
    };
    render: (data: any) => TemplateResult;
};

type ErrorTemplates = {
    [key in ErrorCodes]: TemplateParams;
};

/**
 * Centralised error handling logging. Additional middleware should not
 * try/catch on its own, unless it is rethrowing a modified error,
 * everything should be caught by this middleware.
 */
export function webErrorHandler(
    app: Koa,
    templatePaths: ErrorTemplates,
    renderer: (
        data: any,
        rootComponent: TemplateParams,
    ) => Generator<string | Promise<RenderResult>, void, undefined>,
    staticData?: (ctx: Context) => Promise<any>,
): Koa.Middleware {
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
            const data = await staticData?.(ctx);

            let parsedError;

            try {
                // Ugly but safe for when a non-JOI error is thrown
                parsedError = JSON.parse(err.message);
            } catch (e) {
                parsedError = err.message;
            }

            data.error = parsedError;
            data.status = status;

            const page = await renderer(data, templatePaths[ctx.status]);
            streamResponse(ctx, page, status);

            ctx.app.emit('error', err, ctx);
        }
    };
}
