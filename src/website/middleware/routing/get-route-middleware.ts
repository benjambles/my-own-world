import type { Middleware } from 'koa';
import type { Router, Spec } from 'koa-joi-router';
import type { ServerContext, ServerRenderer } from '../../../ui/utils/templates/server-context.js';

interface GetRouteMiddleware {
    router: Router;
    renderContext: ServerContext;
    renderToString: ServerRenderer;
    routes: CreateRouteHandler[];
}

interface CreateRouteHandler {
    (renderContext, renderToString): Spec;
}

/**
 *
 * @param param0
 */
export function getRouteMiddleware({
    router,
    renderContext,
    renderToString,
    routes,
}: GetRouteMiddleware): Middleware[] {
    return routes.map((routeHandler) => {
        return router.route(routeHandler(renderContext, renderToString)).middleware();
    });
}
