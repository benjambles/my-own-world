import { getAccessChecker } from '../../utils/middleware/get-access-checker';
import { bindOptions } from '../../utils/routes/bind-options';
import { getAccessMap } from '../../utils/security/get-access-map';
import * as config from './config.json';
import * as serviceRoutes from './routes';

/**
 * Routes on /service
 */
export const routeHandlers = {
    ...serviceRoutes,
    sendOptions: bindOptions(config),
    checkAccess: getAccessChecker(getAccessMap()),
};
