import crypto = require('crypto');
import * as Koa from 'koa';

export function sendAPIResponse(ctx: Koa.Context, meta: APIMeta, body: APIBody): void {
    ctx.status = 200;
    ctx.body = buildResponse(meta, body);
}

export function sendOptions(ctx: Koa.Context, config): void {
    delete config.options;

    ctx.set('Allow', Object.keys(config).toString().toUpperCase());
    ctx.status = 200;
    ctx.body = config;
}

export function sendAPIError(ctx: Koa.Context, error: String, statusCode: number = 400, data: Object = undefined): void {
    ctx.throw(statusCode, error, data);
}

function buildMeta(meta: APIMeta, body: APIBody): APIMeta {
    meta.lastModified = new Date().toISOString();
    return meta;
}

function buildResponse(meta: APIMeta, body: APIBody): APIResponse {
    let processedBody = body;
    let processedMeta = buildMeta(meta, processedBody);

    return {
        meta: processedMeta,
        body: processedBody
    };
}