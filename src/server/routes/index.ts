import * as Koa from 'koa';
import { NODE_ENV, responseStatuses } from '../lib/config';

/**
 * Returns a middleware for generating OPTIONS and returning the swagger conf for the given route to the browser
 * @param config Configs for the given route
 */
export function bindOptions(config): Function {
    /**
     * Return the options and config for the route
     * @route [OPTIONS] /users
     * @param ctx A Koa context object
     */
    return async function sendOptions(ctx: Koa.Context): Promise<void> {
        const error = { message: 'There was an error whilst generating options', status: 400 };

        await send(ctx, error, async function () {
            let response = Object.assign({}, config.paths[ctx.request.path.replace('/api', '')])
            delete response.options;

            ctx.set('Allow', Object.keys(response).join(', ').toUpperCase());

            return { data: response };
        });
    }
}

/**
 * Sends an api response where possible, and handles sending clean errors when thrown.
 * @param ctx A Koa context
 * @param error Default error parameters for when an error isn't sent, or to hide dev errors
 * @param data A function that generates the response data
 */
export async function send(ctx: Koa.Context, error: iError, data: Function): Promise<void> {
    try {
        let message = await data();
        sendAPIResponse(ctx, message);
    } catch (e) {
        sendError(ctx, e, error);
    }
}

/**
 * Builds a formatted API response and returns it to the middleware stack
 * @param ctx A Koa context
 * @param meta Additional parameters to append to the response meta object
 * @param body Additional parameters to append to the response body object
 */
function sendAPIResponse(ctx: Koa.Context, data): void {
    let status = data.status || 200;
    let responseData = data.data || {};

    if (data.parts) {
        responseData = {
            meta: buildMeta(data.parts[1] || {}, { status, message: responseStatuses.success }),
            body: data.parts[0]
        }
    }

    ctx.status = status;
    ctx.body = responseData;
}

/**
 * 
 * @param ctx Koa Context
 * @param error A JS, or http-errors error object
 * @param safe Default error parameters for when an error isn't sent, or to hide dev errors
 */
function sendError(ctx, error, safe = { message: '', status: 400 }) {
    let { status = safe.status, message = safe.message } = error;

    if (NODE_ENV === 'production') {
        status = safe.status;
        message = safe.message;
    }

    ctx.throw(status, message);
}

/**
 * Builds a meta object that provides not data information about the response
 * @param meta Additional parameters to append to the response meta object
 * @param body Additional parameters to append to the response body object
 */
function buildMeta(meta: APIMeta, additionalData): APIMeta {
    const newMeta = Object.assign({}, meta, additionalData);
    newMeta.lastModified = new Date().toISOString();
    return newMeta;
}
