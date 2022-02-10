import config from './config.json' assert { type: 'json' };
import * as serviceRoutes from './routes.js';

/**
 * Routes on /service
 */
export default {
    config,
    routeHandlers: serviceRoutes,
};
