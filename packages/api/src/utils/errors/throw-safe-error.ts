import type { KoaContext } from '@benjambles/mow-server/lib/koa/app.js';

/**
 * Throw an error that is safe in each environment context to the errorHandler
 * @param ctx - Koa Context
 * @param error - A JS, or http-errors error object
 * @param safe - Default error parameters for when an error isn't sent, or to hide dev errors
 */
export function throwSafeError(ctx: KoaContext, error, safe = { message: '', status: 400 }): void {
    if (isProduction(ctx.env.nodeEnv)) {
        ctx.throw(safe.status, safe.message);
    }

    const { status = safe.status, message = safe.message } = error;
    ctx.throw(status, message);
}

function isProduction(nodeEnv) {
    return 'production' === nodeEnv;
}
