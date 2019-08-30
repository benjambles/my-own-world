import * as Koa from 'koa';
import { propOr } from 'ramda';
import throwSafeError from '../errors/throw-safe-error';
import { getResponseBody } from './responses';

/**
 * Sends an api response where possible, and handles sending clean errors when thrown.
 * @param ctx - A Koa context
 * @param error - Default error parameters for when an error isn't sent, or to hide dev errors
 * @param data - A function that generates the response data
 */
export default async function send(ctx: Koa.Context, error: iError, data: Function): Promise<void> {
    try {
        const response: ApiResponse = await data(ctx);
        const status = propOr(200, 'status', response);

        ctx.status = status;
        ctx.body = getResponseBody(response, status);
    } catch (e) {
        throwSafeError(ctx, e, error);
    }
}
