import { getRouteHandler, RouteConfig } from '../utils/get-route-handler.js';
import { accountRoutes } from './account/index.js';
import { gameRoutes } from './game/index.js';
import { publicRoutes } from './public/index.js';

export const routesConfig: RouteConfig[] = [accountRoutes, gameRoutes, publicRoutes]
    .flat()
    .map(getRouteHandler);
