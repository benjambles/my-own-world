import { KoaContext } from '../../index.js';
import { throwSafeError } from '../errors.js';
import { getResponseBody } from './responses.js';

interface ErrorValues {
    status: number;
    message: string;
}

export interface Send {
    (ctx: KoaContext, error: ErrorValues, data: DataPromise): Promise<void>;
}

type DataPromise = (ctx: KoaContext) => Promise<any>;

/**
 * Sends an api response where possible, and handles sending clean errors when thrown.
 * @param ctx - A Koa context
 * @param error - Default error parameters for when an error isn't sent, or to hide dev errors
 * @param data - A function that generates the response data
 */
export async function send(ctx: KoaContext, error: ErrorValues, data: DataPromise): Promise<void> {
    try {
        const response = await data(ctx);
        const status: number = response.status || 200;

        ctx.status = status;
        ctx.body = getResponseBody(response, status);
    } catch (e) {
        throwSafeError(ctx, e, error);
    }
}
