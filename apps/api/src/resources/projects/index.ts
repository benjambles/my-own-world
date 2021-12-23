import { getAccessChecker } from '../../utils/middleware/get-access-checker.js';
import { bindOptions } from '../../utils/routes/bind-options.js';
import { getAccessMap } from '../../utils/security/get-access-map.js';
import projectsConfig from './config.json' assert { type: 'json' };
import * as projectRoutes from './routes.js';
import * as projectUserRoutes from './users/routes.js';

export const config = projectsConfig;

/**
 * Routes on /project and /project/*
 */
export const routeHandlers = {
    ...projectRoutes,
    ...projectUserRoutes,
    checkAccess: getAccessChecker(getAccessMap()),
    sendOptions: bindOptions(config),
};
