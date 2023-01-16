import router, { Spec } from 'koa-joi-router';

/**
 * Return a Koa joi router route
 * @param prefix - First part of the given route.
 */
export function createRoute(prefix: string, routeMap: Spec[]) {
    return router().route(routeMap).prefix(prefix);
}
