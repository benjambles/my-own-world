import * as Koa from 'koa';

/**
 * Builds a formatted API response and returns it to the middleware stack
 * @param ctx A Koa context
 * @param meta Additional parameters to append to the response meta object
 * @param body Additional parameters to append to the response body object
 */
export function sendAPIResponse(ctx: Koa.Context, meta: APIMeta, body: APIBody): void {
    ctx.status = 200;
    ctx.body = buildResponse(meta, body);
}

/**
 * Returns the methods available along with the swagger docs for the given route
 * @param ctx A Koa context
 * @param config An object represeting methods for the route in swagger format
 */
export function sendOptions(ctx: Koa.Context, config): void {
    delete config.options;

    ctx.set('Allow', Object.keys(config).join(', ').toUpperCase());
    ctx.status = 200;
    ctx.body = config;
}

/**
 * Builds a meta object that provides not data information about the response
 * @param meta Additional parameters to append to the response meta object
 * @param body Additional parameters to append to the response body object
 */
function buildMeta(meta: APIMeta, body: APIBody): APIMeta {
    meta.lastModified = new Date().toISOString();
    return meta;
}

/**
 * Returns a complete formatted API response
 * @param meta Additional parameters to append to the response meta object
 * @param body Additional parameters to append to the response body object
 */
function buildResponse(meta: APIMeta, body: APIBody): APIResponse {
    let processedBody = body;
    let processedMeta = buildMeta(meta, processedBody);

    return {
        meta: processedMeta,
        body: processedBody
    };
}