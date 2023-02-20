import { Context } from 'koa';

/**
 *
 * @param ctx
 */
export function throwNoAccessError(ctx: Context) {
    return () => {
        ctx.throw(401, 'Unauthorised access to endpoint');
    };
}

/**
 *
 * @param ctx
 */
export function badResponseError(ctx: Context) {
    return (msg: string) => {
        ctx.throw(400, msg);
    };
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
export function throwSafeError(
    ctx: Context,
    error: Partial<ErrorData>,
    safe: ErrorValues,
): void {
    const safeError = {
        message: 'There was an error',
        status: 400,
        ...(typeof safe === 'string' ? { message: safe } : safe),
    };

    if (isProduction(ctx.state.env.NODE_ENV)) {
        ctx.throw(safeError.status, safeError.message);
    }

    const errorMessage =
        error instanceof Error ? error.message : typeof error === 'string' ? error : null;

    const { status, message } = {
        ...safeError,
        ...(errorMessage ? { message: errorMessage, status: 500 } : error),
    };
    ctx.throw(status, message);
}

function isProduction(nodeEnv: string) {
    return 'production' === nodeEnv;
}
