import * as Koa from 'koa';

import { getSystemKey } from './service';
import { generateRoute, partsResponse, dataResponse } from '../../utils/routes';

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
        return dataResponse(undefined);
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
        const { key, value } = await getSystemKey('api_version');
        return dataResponse({
            [key]: value
        });
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
        return partsResponse();
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
        return partsResponse();
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
        return partsResponse();
    }
);