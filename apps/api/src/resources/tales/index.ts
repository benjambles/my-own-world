// import * as actorRoutes from './actors/routes.js';
// import * as encounterRoutes from './encounters/routes.js';
// import * as sceneRoutes from './scenes/routes.js';
import config from './config.json' assert { type: 'json' };
import * as taleRoutes from './routes.js';


/**
 * Routes on /project and /project/*
 */
export default {
    config,
    routeHandlers: {
        ...taleRoutes,
        // ...actorRoutes,
        // ...encounterRoutes,
        // ...sceneRoutes,
    }
};
