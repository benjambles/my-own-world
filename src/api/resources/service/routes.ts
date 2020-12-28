import { RouteHandler } from '../../routing/spec-parsing/get-route-middleware';
import { dataResponse, partsResponse } from '../../utils/routes/responses';
import { getSystemKey } from './service';

/**
 * Gets the API health
 * @route [GET] /health
 */
export const getHealth: RouteHandler = (send) => {
    const defaultError = {
        message: 'Service unavailable',
        status: 503,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async () => dataResponse('ok'));
    };
};

/**
 * Gets the API version
 * @route [GET] /version
 */
export const getVersion: RouteHandler = (send) => {
    const defaultError = {
        message: 'Service unavailable',
        status: 503,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async () => {
            const { key, value } = await getSystemKey('api_version');
            dataResponse({
                [key]: value,
            });
        });
    };
};

/**
 * Gets metrics regarding platform health and status
 * @route [GET] /status
 */
export const getStatus: RouteHandler = (send) => {
    const defaultError = {
        message: 'Service unavailable',
        status: 503,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async () => partsResponse());
    };
};

/**
 * Gets metrics and API uptime and usage
 * @route [GET] /metrics
 */
export const getMetrics: RouteHandler = (send) => {
    const defaultError = {
        message: 'Service unavailable',
        status: 503,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async () => partsResponse());
    };
};

/**
 * Gets debug metrics for dev purposes
 * @route [GET] /debug
 */
export const getDebugData: RouteHandler = (send) => {
    const defaultError = {
        message: 'Service unavailable',
        status: 503,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async () => partsResponse());
    };
};
