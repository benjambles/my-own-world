import { getAccessChecker } from '../../utils/middleware/get-access-checker';
import { bindOptions } from '../../utils/routes/bind-options';
import getAccessMap from '../../utils/security/get-access-map';
import * as serviceRoutes from './routes';

const config = require('./config.json');

/**
 * Routes on /service
 */
export const routeHandlers = {
    ...serviceRoutes,
    sendOptions: bindOptions(config),
    checkAccess: getAccessChecker(getAccessMap()),
};
