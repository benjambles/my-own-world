import { Middleware } from 'koa';
import { KoaContext } from '../index.js';
import { getAccessChecker } from '../koa/middleware/get-access-checker.js';
import { bindOptions } from '../utils/routes/bind-options.js';
import { getAccessMap } from '../utils/routes/get-access-map.js';
import { RouteHandlers } from './spec-parsing/get-route-middleware.js';

interface AccessMap {
    [name: string]: (ctx: KoaContext) => boolean;
}

interface RouteHandlersWithDefaults extends RouteHandlers {
    sendOptions: Middleware;
    checkAccess: Middleware;
}

export function attachDefaultHandlers(
    config,
    accessMap: AccessMap | false,
    routes: RouteHandlers,
): RouteHandlersWithDefaults {
    const routeHandlers = {
        ...routes,
        sendOptions: bindOptions(config),
        checkAccess: async (ctx, next) => {
            await next();
        },
    };

    if (accessMap !== false) {
        routeHandlers.checkAccess = getAccessChecker(getAccessMap(accessMap));
    }

    return routeHandlers;
}
