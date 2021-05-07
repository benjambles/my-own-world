import type { Middleware } from 'koa';
import type { Option } from 'ts-option';
import { maybeProp, maybePropIsFn } from '../../utils/functional/maybe-prop.js';
import { catchJoiErrors } from '../../utils/middleware/catch-joi-errors.js';
import type { Send } from '../../utils/routes/send.js';
export interface RouteHandler {
    (send: Send, collection): Middleware;
}

export interface RouteHandlers {
    [name: string]: RouteHandler | Middleware;
}

/**
 *
 * @param spec
 * @param routeHandlers
 */
export const getRouteMiddleware = (
    spec,
    routeHandlers: Record<string, RouteHandler | Middleware>,
    send: Send,
    dbInstance,
): Option<Middleware[]> => {
    return maybeProp('operationId', spec)
        .flatMap((prop) => maybePropIsFn(prop, routeHandlers))
        .map((getHandler) => getHandler(send, dbInstance))
        .map((routeHandler) => [catchJoiErrors, routeHandler, routeHandlers.checkAccess]);
};
