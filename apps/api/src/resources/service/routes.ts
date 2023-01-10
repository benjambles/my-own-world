import {
    getDataMiddleware,
    getPartsMiddleware,
} from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { DataModel } from '../../app.js';

export function serviceRoutes(dataModel: DataModel) {
    const system = dataModel.get('system');

    return {
        /**
         * Gets the API health
         * @route [GET] /health
         */
        getHealth: getDataMiddleware(
            {
                message: 'Service unavailable',
                status: 503,
            },
            async () => 'ok',
        ),

        /**
         * Gets the API version
         * @route [GET] /version
         */
        getVersion: getPartsMiddleware(
            {
                message: 'Service unavailable',
                status: 503,
            },
            async () => {
                const { key, value } = await system.find('api_version');
                return {
                    [key]: value,
                };
            },
        ),

        /**
         * Gets metrics regarding platform health and status
         * @route [GET] /status
         */
        getStatus: getDataMiddleware(
            {
                message: 'Service unavailable',
                status: 503,
            },
            async () => 'ok',
        ),

        /**
         * Gets metrics and API uptime and usage
         * @route [GET] /metrics
         */
        getMetrics: getDataMiddleware(
            {
                message: 'Service unavailable',
                status: 503,
            },
            async () => 'ok',
        ),

        /**
         * Gets debug metrics for dev purposes
         * @route [GET] /debug
         */
        getDebugData: getDataMiddleware(
            {
                message: 'Service unavailable',
                status: 503,
            },
            async () => 'ok',
        ),
    };
}
