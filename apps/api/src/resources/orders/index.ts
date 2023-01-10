import { DataModel } from '../../app.js';
import config from './config.json' assert { type: 'json' };
import { orderRoutes } from './routes.js';

/**
 * Routes on /order and /order/*
 */
export default function order(dataModel: DataModel) {
    return {
        config,
        routeHandlers: {
            ...orderRoutes(dataModel),
        },
    };
}
