import { getAccessChecker } from '../../utils/middleware/get-access-checker';
import { bindOptions } from '../../utils/routes/bind-options';
import { getAccessMap } from '../../utils/security/get-access-map';
import * as taleRoutes from './routes';
// import * as actorRoutes from './actors/routes';
// import * as encounterRoutes from './encounters/routes';
// import * as sceneRoutes from './scenes/routes';

const config = require('./config.json');

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
