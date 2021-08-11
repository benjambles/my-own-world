import { getAccessChecker } from '../../utils/middleware/get-access-checker.js';
import { bindOptions } from '../../utils/routes/bind-options.js';
import { getAccessMap } from '../../utils/security/get-access-map.js';
import serviceConfig from './config.json';
import * as serviceRoutes from './routes.js';

export const config = serviceConfig;

/**
 * Routes on /service
 */
export const routeHandlers = {
    ...serviceRoutes,
    sendOptions: bindOptions(config),
    checkAccess: getAccessChecker(getAccessMap()),
};
