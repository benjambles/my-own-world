import { Middleware } from 'koa';
import { Option } from 'ts-option';
import { catchJoiErrors } from '../../koa/middleware/catch-joi-errors.js';
import { maybeProp, maybePropIsFn } from '../../utils/functional/maybe-prop.js';
export interface RouteHandler {
    (collection): Middleware;
}

export interface RouteHandlers {
    [name: string]: RouteHandler | Middleware;
}

/**
 *
 * @param spec
 * @param routeHandlers
 */
export function getRouteMiddleware(
    spec,
    routeHandlers: Record<string, RouteHandler | Middleware>,
    dbInstance,
): Option<Middleware[]> {
    return maybeProp('operationId', spec)
        .flatMap((prop) => maybePropIsFn(prop, routeHandlers))
        .map((getHandler) => [
            catchJoiErrors,
            routeHandlers.checkAccess,
            getHandler(dbInstance),
        ]);
}
