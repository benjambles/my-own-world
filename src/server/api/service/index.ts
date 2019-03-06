import { baseAccessMap, bindCheckAccess, bindOptions } from '../../utils/routes';
import * as serviceRoutes from './routes';

const config = require('./config.json');

/**
 * Routes on /service
 */
export const routeHandlers = {
    ...serviceRoutes,
    sendOptions: bindOptions(config),
    checkAccess: bindCheckAccess(baseAccessMap)
};
