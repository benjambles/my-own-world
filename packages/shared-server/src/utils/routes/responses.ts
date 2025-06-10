import { RenderResult } from '@lit-labs/ssr';
import { RenderResultReadable } from '@lit-labs/ssr/lib/render-result-readable.js';
import { Context, Middleware } from 'koa';
import { throwSafeError } from '../errors.js';

export function getDataMiddleware(callback: Middleware): Middleware {
    return async (ctx: Context, next) => {
        try {
            const { status = 200, body, redirectUrl } = await callback(ctx, next);

            ctx.status = status;

            if (redirectUrl) {
                ctx.redirect(redirectUrl);
            }

            ctx.body = isIterable(body) ? new RenderResultReadable(body) : body;

            ctx.type = ctx.api === true ? 'application/json' : 'text/html';

            await next();
        } catch (e) {
            throwSafeError(ctx, e);
        }
    };
}

export function streamResponse(
    ctx: Context,
    body: Iterable<string | Promise<RenderResult>>,
    status: number = 200,
    type = 'text/html',
) {
    ctx.status = status;
    ctx.type = type;
    ctx.body = new RenderResultReadable(body);
}

export function ok<B>(body: B) {
    return { status: 200, body } as const;
}

export function created<B>(body: B) {
    return { status: 201, body } as const;
}

export function noContent() {
    return { status: 204 } as const;
}

export function seeOther(redirectUrl: string) {
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
