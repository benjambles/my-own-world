import { Middleware } from 'koa';
import { dataResponse, partsResponse } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { Send } from '@benjambles/mow-server/dist/utils/routes/send.js';
import { getSystemKey } from './service.js';

/**
 * Gets the API health
 * @route [GET] /health
 */
export function getHealth(send: Send): Middleware {
    const defaultError = {
        message: 'Service unavailable',
        status: 503,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async () => dataResponse('ok'));
    };
}

/**
 * Gets the API version
 * @route [GET] /version
 */
export function getVersion(send: Send, dbInstance): Middleware {
    const defaultError = {
        message: 'Service unavailable',
        status: 503,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async () => {
            const { key, value } = await getSystemKey(dbInstance, 'api_version');
            dataResponse({
                [key]: value,
            });
        });
    };
}

/**
 * Gets metrics regarding platform health and status
 * @route [GET] /status
 */
export function getStatus(send: Send): Middleware {
    const defaultError = {
        message: 'Service unavailable',
        status: 503,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async () => partsResponse());
    };
}

/**
 * Gets metrics and API uptime and usage
 * @route [GET] /metrics
 */
export function getMetrics(send: Send): Middleware {
    const defaultError = {
        message: 'Service unavailable',
        status: 503,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async () => partsResponse());
    };
}

/**
 * Gets debug metrics for dev purposes
 * @route [GET] /debug
 */
export function getDebugData(send: Send): Middleware {
    const defaultError = {
        message: 'Service unavailable',
        status: 503,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async () => partsResponse());
    };
}
