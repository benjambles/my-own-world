import { Middleware } from 'koa';
import createRouter, { Router } from 'koa-joi-router';
import { ServerContext, ServerRenderer } from '@ui/utils/templates/server-context';

interface GetRouteMiddleware {
    router: Router;
    renderContext: ServerContext;
    renderToString: ServerRenderer;
    routes: CreateRouteHandler[];
}

interface CreateRouteHandler {
    (renderContext, renderToString): createRouter.Spec;
}

/**
 *
 * @param param0
 */
export const getRouteMiddleware = ({
    router,
    renderContext,
    renderToString,
    routes,
}: GetRouteMiddleware): Middleware[] => {
    return routes.map((routeHandler) => {
        return router.route(routeHandler(renderContext, renderToString)).middleware();
    });
};
