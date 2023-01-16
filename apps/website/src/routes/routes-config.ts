import { getRouteHandler, RouteConfig } from '../utils/get-route-handler.js';
import { accountRoutes } from './account/index.js';
import { publicRoutes } from './public/index.js';

export const routesConfig: RouteConfig[] = [accountRoutes, publicRoutes]
    .flat()
    .map(getRouteHandler);
