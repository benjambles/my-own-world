import { DataModel } from '../../app.js';
import config from './config.json' assert { type: 'json' };
import { taleRoutes } from './routes.js';

/**
 * Routes on /tales and /tales/*
 */
export default function tales(dataModel: DataModel) {
    return {
        config,
        routeHandlers: {
            ...taleRoutes(dataModel),
        },
    };
}
