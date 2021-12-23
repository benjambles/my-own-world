import { Middleware } from 'koa';
import { Router, Spec } from 'koa-joi-router';

interface GetRouteMiddleware {
    router: Router;
    routes: Spec[];
}

/**
 *
 * @param param0
 */
export function getRouteMiddleware({ router, routes }: GetRouteMiddleware): Middleware[] {
    return routes.map((routeHandler) => {
        return router.route(routeHandler).middleware();
    });
}
