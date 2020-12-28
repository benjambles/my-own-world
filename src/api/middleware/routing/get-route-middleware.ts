import { Middleware } from 'koa';

/**
 *
 * @param param0
 */
export const getRouteMiddleware = (routeHandlers): Middleware[] => {
    return routeHandlers.map((route) => route.middleware());
};
