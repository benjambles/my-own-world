import { propOr } from 'ramda';
import { KoaContext } from '@sharedServer/koa/app';
import { throwSafeError } from '../errors/throw-safe-error';
import { getResponseBody } from './responses';

interface ErrorValues {
    status: number;
    message: string;
}

export interface Send {
    (ctx: KoaContext, error: ErrorValues, data: (ctx: KoaContext) => Promise<any>): Promise<void>;
}

/**
 * Sends an api response where possible, and handles sending clean errors when thrown.
 * @param ctx - A Koa context
 * @param error - Default error parameters for when an error isn't sent, or to hide dev errors
 * @param data - A function that generates the response data
 */
export const send: Send = async (ctx, error, data) => {
    try {
        const response = await data(ctx);
        const status: number = propOr(200, 'status', response);

        ctx.status = status;
        ctx.body = getResponseBody(response, status);
    } catch (e) {
        throwSafeError(ctx, e, error);
    }
};
