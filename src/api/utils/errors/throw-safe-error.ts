import { props } from 'ramda';
import { KoaContext } from '../../../shared-server/koa/app';

/**
 * Throw an error that is safe in each environment context to the errorHandler
 * @param ctx - Koa Context
 * @param error - A JS, or http-errors error object
 * @param safe - Default error parameters for when an error isn't sent, or to hide dev errors
 */
export const throwSafeError = (
    ctx: KoaContext,
    error,
    safe = { message: '', status: 400 },
): void => {
    if (isProduction(ctx.env.nodeEnv)) {
        ctx.throw(props(['status', 'message'], safe));
    }

    const { status = safe.status, message = safe.message } = error;
    ctx.throw(status, message);
};

const isProduction = (nodeEnv) => {
    return 'production' === nodeEnv;
};
