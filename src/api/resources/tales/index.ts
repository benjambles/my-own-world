import { getAccessChecker } from '../../utils/middleware/get-access-checker';
import { bindOptions } from '../../utils/routes/bind-options';
import { getAccessMap } from '../../utils/security/get-access-map';
// import * as actorRoutes from './actors/routes';
// import * as encounterRoutes from './encounters/routes';
// import * as sceneRoutes from './scenes/routes';
import * as config from './config.json';
import * as taleRoutes from './routes';

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
