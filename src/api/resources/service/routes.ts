import Koa from 'koa';
import { generateRoute } from '../../utils/routes/generate-route';
import {
    DataResponse,
    dataResponse,
    PartsResponse,
    partsResponse,
} from '../../utils/routes/responses';
import { getSystemKey } from './service';

/**
 * Gets the API health
 * @route [GET] /health
 */
export const getHealth: Koa.Middleware = generateRoute(
    {
        message: 'Service unavailable',
        status: 503,
    },
    async (): Promise<DataResponse> => {
        return dataResponse(undefined);
    },
);

/**
 * Gets the API version
 * @route [GET] /version
 */
export const getVersion: Koa.Middleware = generateRoute(
    {
        message: 'Service unavailable',
        status: 503,
    },
    async (): Promise<DataResponse> => {
        const { key, value } = await getSystemKey('api_version');

        return dataResponse({
            [key]: value,
        });
    },
);

/**
 * Gets metrics regarding platform health and status
 * @route [GET] /status
 */
export const getStatus: Koa.Middleware = generateRoute(
    {
        message: 'Service unavailable',
        status: 503,
    },
    async (): Promise<PartsResponse> => {
        return partsResponse();
    },
);

/**
 * Gets metrics and API uptime and usage
 * @route [GET] /metrics
 */
export const getMetrics: Koa.Middleware = generateRoute(
    {
        message: 'Service unavailable',
        status: 503,
    },
    async (): Promise<PartsResponse> => {
        return partsResponse();
    },
);

/**
 * Gets debug metrics for dev purposes
 * @route [GET] /debug
 */
export const getDebugData: Koa.Middleware = generateRoute(
    {
        message: 'Service unavailable',
        status: 503,
    },
    async (): Promise<PartsResponse> => {
        return partsResponse();
    },
);
