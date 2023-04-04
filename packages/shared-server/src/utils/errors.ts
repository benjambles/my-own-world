import { Context } from 'koa';

/**
 *
 * @param ctx
 */
export function throwBadResponse(ctx: Context, msg: string) {
    ctx.throw(400, msg);
}

/**
 *
 * @param ctx
 */
export function throwNoAccess(ctx: Context) {
    ctx.throw(401, ctx.state?.jwtOriginalError ?? 'Unauthorised access to endpoint');
}

type ErrorData = {
    message: string;
    status?: number;
};

export type ErrorValues = string | ErrorData;

/**
 * Throw an error that is safe in each environment context to the errorHandler
 * @param ctx - Koa Context
 * @param error - A JS, or http-errors error object
 * @param safe - Default error parameters for when an error isn't sent, or to hide dev errors
 */
export function throwSafeError(ctx: Context, error: Partial<ErrorData>): void {
    const errorMessage = error instanceof Error ? error.message : error;
    const status = 'status' in error ? error.status : 500;
    ctx.throw(status, errorMessage);
}
