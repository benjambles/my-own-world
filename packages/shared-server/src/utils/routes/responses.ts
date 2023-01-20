import { Context, Middleware } from 'koa';
import { Readable } from 'stream';
import { ErrorValues, throwSafeError } from '../errors.js';

export function getDataMiddleware(
    defaultError: ErrorValues,
    callback: Middleware,
): Middleware {
    return async (ctx: Context, next) => {
        try {
            const response = await callback(ctx, next);
            const status: number = response.status || 200;

            ctx.status = status;
            ctx.body = response.data;
        } catch (e) {
            throwSafeError(ctx, e, defaultError);
        }

        await next();
    };
}

export function streamResponse(
    ctx: Context,
    body: Iterable<unknown>,
    status: number = 200,
    type = 'text/html',
) {
    ctx.status = status;
    ctx.type = type;
    ctx.body = Readable.from(body);
}

export function ok<D>(data: D) {
    return { status: 200, data } as const;
}

export function created<D>(data: D) {
    return { status: 201, data } as const;
}

export function noResponse() {
    return { status: 204 } as const;
}
