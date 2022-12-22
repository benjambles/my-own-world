import { Middleware } from 'koa';
import { Readable } from 'stream';
import { KoaContext } from '../../index.js';
import { send } from './send.js';

export interface DataResponse {
    data: any;
}

export interface PartsResponse {
    body: any;
    meta: APIMeta;
}

interface APIMeta {
    message?: string;
    lastModified?: string;
    [name: string]: any;
}

/**
 * Structure for a response that should be just sent as is
 * @param data
 */
export function dataResponse<T>(data?: T): DataResponse {
    return { data };
}

/**
 * Structures an API response
 * @param {object} body - The content of the response
 * @param {object} meta - Useful information pertaining to the response
 */
export function partsResponse(body = {}, meta: APIMeta = {}): PartsResponse {
    return {
        body,
        meta,
    };
}

/**
 *
 * @param response
 */
export function getResponseBody(response, status): PartsResponse | DataResponse {
    if (response.meta) {
        response.meta.status = status;
        response.meta.message = 'success';
        return response;
    }

    return dataResponse(response.data);
}

interface DefaultError {
    message: string;
    status: number;
}

export function getPartsMiddleware(defaultError: DefaultError, callback): Middleware {
    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const responseBody = await callback(ctx);
            return partsResponse(responseBody);
        });
    };
}

export function getDataMiddleware(defaultError: DefaultError, callback): Middleware {
    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const responseBody = await callback(ctx);
            return dataResponse(responseBody);
        });
    };
}

export function streamResponse(
    ctx: KoaContext,
    body: Iterable<unknown>,
    status: number = 200,
    type = 'text/html',
) {
    ctx.status = status;
    ctx.type = type;
    ctx.body = Readable.from(body);
}
