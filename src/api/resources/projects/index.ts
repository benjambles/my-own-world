import { getAccessChecker } from '../../utils/middleware/get-access-checker';
import { bindOptions } from '../../utils/routes';
import getAccessMap from '../../utils/security/get-access-map';
import * as projectRoutes from './routes';

const config = require('./config.json');

/**
 * Routes on /project and /project/*
 */
export const routeHandlers = {
    ...projectRoutes,
    checkAccess: getAccessChecker(getAccessMap()),
    sendOptions: bindOptions(config)
};
