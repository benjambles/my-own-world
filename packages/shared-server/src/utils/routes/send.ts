import { Context } from 'koa';
import { ErrorValues, throwSafeError } from '../errors.js';
import { getResponseBody } from './responses.js';

export interface Send {
    (ctx: Context, error: ErrorValues, data: DataPromise): Promise<void>;
}

type DataPromise = (ctx: Context) => Promise<any>;

/**
 * Sends an api response where possible, and handles sending clean errors when thrown.
 * @param ctx - A Koa context
 * @param error - Default error parameters for when an error isn't sent, or to hide dev errors
 * @param data - A function that generates the response data
 */
export async function send(
    ctx: Context,
    error: ErrorValues | string | undefined,
    data: DataPromise,
): Promise<void> {
    try {
        const response = await data(ctx);
        const status: number = response.status || 200;

        ctx.status = status;
        ctx.body = getResponseBody(response, status);
    } catch (e) {
        throwSafeError(ctx, e, error);
    }
}
