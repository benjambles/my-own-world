import { getAccessChecker } from '../../utils/middleware/get-access-checker';
import { bindOptions } from '../../utils/routes/bind-options';
import { getAccessMap } from '../../utils/security/get-access-map';
import * as projectRoutes from './routes';
import * as projectUserRoutes from './users/routes';

const config = require('./config.json');

/**
 * Routes on /project and /project/*
 */
export const routeHandlers = {
    ...projectRoutes,
    ...projectUserRoutes,
    checkAccess: getAccessChecker(getAccessMap()),
    sendOptions: bindOptions(config),
};
