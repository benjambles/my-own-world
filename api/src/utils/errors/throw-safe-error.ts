import * as Koa from 'koa';
import { props } from 'ramda';
import { isProduction } from '../../config';

/**
 * Throw an error that is safe in each environment context to the errorHandler
 * @param ctx - Koa Context
 * @param error - A JS, or http-errors error object
 * @param safe - Default error parameters for when an error isn't sent, or to hide dev errors
 */
export default function throwSafeError(
    ctx: Koa.Context,
    error,
    safe = { message: '', status: 400 }
): void {
    if (isProduction()) {
        ctx.throw(props(['status', 'message'], safe));
    }

    const { status = safe.status, message = safe.message } = error;
    ctx.throw(status, message);
}