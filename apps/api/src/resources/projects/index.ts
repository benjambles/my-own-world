import config from './config.json' assert { type: 'json' };
import * as projectRoutes from './routes.js';
import * as projectUserRoutes from './users/routes.js';

/**
 * Routes on /project and /project/*
 */
export default {
    config,
    routeHandlers: {
        ...projectRoutes, 
        ...projectUserRoutes
    }
} 
