import * as Koa from 'koa';

import { getVersionData } from './service';
import { generateRoute } from '../../utils/routes';

/**
 * Gets the API health
 * @route [GET] /health
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 * @returns {Promise<void>}
 */
export const getHealth: Function = generateRoute(
    {
        message: 'Service unavailable',
        status: 503
    },
    async function() {
        return { data: undefined };
    }
);

/**
 * Gets the API version
 * @route [GET] /version
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 * @returns {Promise<void>}
 */
export const getVersion: Function = generateRoute(
    {
        message: 'Service unavailable',
        status: 503
    },
    async function() {
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
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 * @returns {Promise<void>}
 */
export const getStatus: Function = generateRoute(
    {
        message: 'Service unavailable',
        status: 503
    },
    async function() {
        return { parts: [] };
    }
);

/**
 * Gets metrics and API uptime and usage
 * @route [GET] /metrics
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 * @returns {Promise<void>}
 */
export const getMetrics: Function = generateRoute(
    {
        message: 'Service unavailable',
        status: 503
    },
    async function() {
        return { parts: [] };
    }
);

/**
 * Gets debug metrics for dev purposes
 * @route [GET] /debug
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 * @returns {Promise<void>}
 */
export const getDebugData: Function = generateRoute(
    {
        message: 'Service unavailable',
        status: 503
    },
    async function() {
        return { parts: [] };
    }
);
