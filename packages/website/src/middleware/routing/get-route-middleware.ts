import type {
    ServerContext,
    ServerRenderer,
} from '@benjambles/mow-ui/lib/utils/templates/server-context.js';
import type { Router, Spec } from 'koa-joi-router';

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
}: GetRouteMiddleware) {
    return routes.map((routeHandler) => {
        return router.route(routeHandler(renderContext, renderToString)).middleware();
    });
}
