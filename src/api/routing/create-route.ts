import * as router from 'koa-joi-router';

/**
 * Return a Koa joi router route
 * @param prefix - First part of the given route.
 */
export default function createRoute(prefix: string) {
    return routeMap =>
        router()
            .route(routeMap)
            .prefix(`/${prefix}`);
}
