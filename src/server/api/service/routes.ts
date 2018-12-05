import * as Koa from 'koa';

import { getVersionData } from './service';
import { generateRoute } from '../../utils/routes';

/**
 * Gets the API health
 * @route [GET] /health
 */
export const getHealth: Koa.Middleware = generateRoute(
    {
        message: 'Service unavailable',
        status: 503
    },
    async (): Promise<ApiResponse> => {
        return { data: undefined };
    }
);

/**
 * Gets the API version
 * @route [GET] /version
 */
export const getVersion: Koa.Middleware = generateRoute(
    {
        message: 'Service unavailable',
        status: 503
    },
    async (): Promise<ApiResponse> => {
        const { key, value } = await getVersionData();
        return {
            data: {
                [key]: value
            }
        };
    }
);

/**
 * Gets metrics regarding platform health and status
 * @route [GET] /status
 */
export const getStatus: Koa.Middleware = generateRoute(
    {
        message: 'Service unavailable',
        status: 503
    },
    async (): Promise<ApiResponse> => {
        return { parts: [] };
    }
);

/**
 * Gets metrics and API uptime and usage
 * @route [GET] /metrics
 */
export const getMetrics: Koa.Middleware = generateRoute(
    {
        message: 'Service unavailable',
        status: 503
    },
    async (): Promise<ApiResponse> => {
        return { parts: [] };
    }
);

/**
 * Gets debug metrics for dev purposes
 * @route [GET] /debug
 */
export const getDebugData: Koa.Middleware = generateRoute(
    {
        message: 'Service unavailable',
        status: 503
    },
    async (): Promise<ApiResponse> => {
        return { parts: [] };
    }
);
