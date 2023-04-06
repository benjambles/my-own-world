import { Context, Middleware } from 'koa';
import { Readable } from 'stream';
import { throwSafeError } from '../errors.js';

export function getDataMiddleware(callback: Middleware): Middleware {
    return async (ctx: Context, next) => {
        try {
            const { status = 200, body, redirectUrl } = await callback(ctx, next);

            ctx.status = status;

            if (redirectUrl) {
                ctx.redirect(redirectUrl);
            }

            ctx.body = isIterable(body) ? Readable.from(body) : body;

            ctx.type = ctx.api === true ? 'application/json' : 'text/html';

            await next();
        } catch (e) {
            throwSafeError(ctx, e);
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

export function redirectAction(redirectUrl) {
    return { status: 303, redirectUrl } as const;
}

function isIterable(input) {
    if (input === null || input === undefined) {
        return false;
    }

    return (
        typeof input[Symbol.iterator] === 'function' && typeof input.next === 'function'
    );
}
