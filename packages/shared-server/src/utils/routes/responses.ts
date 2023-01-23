import { Context, Middleware } from 'koa';
import { Readable } from 'stream';
import { ErrorValues, throwSafeError } from '../errors.js';

export function getDataMiddleware(
    defaultError: ErrorValues,
    callback: Middleware,
): Middleware {
    return async (ctx: Context, next) => {
        try {
            const { status = 200, body } = await callback(ctx, next);

            ctx.status = status;
            ctx.body = body;

            await next();
        } catch (e) {
            throwSafeError(ctx, e, defaultError);
        }
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

export function ok<B>(body: B) {
    return { status: 200, body } as const;
}

export function created<B>(body: B) {
    return { status: 201, body } as const;
}

export function noResponse() {
    return { status: 204 } as const;
}
