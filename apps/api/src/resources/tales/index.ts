import { getAccessChecker } from '../../utils/middleware/get-access-checker.js';
import { bindOptions } from '../../utils/routes/bind-options.js';
import { getAccessMap } from '../../utils/security/get-access-map.js';
// import * as actorRoutes from './actors/routes.js';
// import * as encounterRoutes from './encounters/routes.js';
// import * as sceneRoutes from './scenes/routes.js';
import talesConfig from './config.json';
import * as taleRoutes from './routes.js';

export const config = talesConfig;

/**
 * Routes on /project and /project/*
 */
export const routeHandlers = {
    ...taleRoutes,
    // ...actorRoutes,
    // ...encounterRoutes,
    // ...sceneRoutes,
    checkAccess: getAccessChecker(getAccessMap()),
    sendOptions: bindOptions(config),
};
