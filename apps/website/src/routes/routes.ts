import { accountRoutes } from './account/index.js';
import { publicRoutes } from './public/index.js';

export const enum RouteMethods {
    Get = 'get',
    Options = 'options',
    Post = 'post',
}

export const routes = [accountRoutes, publicRoutes].flat();
