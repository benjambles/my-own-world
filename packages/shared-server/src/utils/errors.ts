import { KoaContext } from '../index.js';

/**
 *
 * @param ctx
 */
export function throwNoAccessError(ctx: KoaContext) {
    return () => {
        ctx.throw(401, 'Unauthorised access to endpoint');
    };
}

/**
 *
 * @param ctx
 */
export function badResponseError(ctx: KoaContext) {
    return (msg: string) => {
        ctx.throw(400, msg);
    };
}

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
