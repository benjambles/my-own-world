import { Middleware } from 'koa';
import { accountRoutes } from './account/index.js';
import { publicRoutes } from './public/index.js';

export const enum RouteMethods {
    Get = 'get',
    Options = 'options',
    Post = 'post',
}

export interface RouteConfig {
    method: RouteMethods;
    path: string;
    handler: Middleware;
}

export const routesConfig: RouteConfig[] = [accountRoutes, publicRoutes].flat();
