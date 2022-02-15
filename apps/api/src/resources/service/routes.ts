import {
    getDataMiddleware,
    getPartsMiddleware,
} from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { Middleware } from 'koa';
import { getSystemKey } from './service.js';

/**
 * Gets the API health
 * @route [GET] /health
 */
export function getHealth(): Middleware {
    const defaultError = {
        message: 'Service unavailable',
        status: 503,
    };

    return getDataMiddleware(defaultError, async () => 'ok');
}

/**
 * Gets the API version
 * @route [GET] /version
 */
export function getVersion(dbInstance): Middleware {
    const defaultError = {
        message: 'Service unavailable',
        status: 503,
    };

    return getPartsMiddleware(defaultError, async () => {
        const { key, value } = await getSystemKey(dbInstance, 'api_version');
        return {
            [key]: value,
        };
    });
}

/**
 * Gets metrics regarding platform health and status
 * @route [GET] /status
 */
export function getStatus(): Middleware {
    const defaultError = {
        message: 'Service unavailable',
        status: 503,
    };

    return getDataMiddleware(defaultError, async () => 'ok');
}

/**
 * Gets metrics and API uptime and usage
 * @route [GET] /metrics
 */
export function getMetrics(): Middleware {
    const defaultError = {
        message: 'Service unavailable',
        status: 503,
    };

    return getDataMiddleware(defaultError, async () => 'ok');
}

/**
 * Gets debug metrics for dev purposes
 * @route [GET] /debug
 */
export function getDebugData(): Middleware {
    const defaultError = {
        message: 'Service unavailable',
        status: 503,
    };

    return getDataMiddleware(defaultError, async () => 'ok');
}
