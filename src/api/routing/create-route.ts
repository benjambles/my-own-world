import * as router from 'koa-joi-router';

/**
 * Return a Koa joi router route
 */
export default function createRoute(prefix: string) {
    return routeMap =>
        router()
            .route(routeMap)
            .prefix(`/${prefix}`);
}
