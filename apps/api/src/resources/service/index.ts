import { DataModel } from '../../app.js';
import config from './config.json' assert { type: 'json' };
import { serviceRoutes } from './routes.js';

/**
 * Routes on /service and /service/*
 */
export default function service(dataModel: DataModel) {
    return {
        config,
        routeHandlers: {
            ...serviceRoutes(dataModel),
        },
    };
}
