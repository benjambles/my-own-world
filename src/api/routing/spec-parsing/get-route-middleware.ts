import { Middleware } from 'koa';
import { Option } from 'ts-option';
import { FnMap, maybeProp, maybePropIsFn } from '../../utils/functional/maybe-prop';
import { catchJoiErrors } from '../../utils/middleware/catch-joi-errors';
import { Send } from '../../utils/routes/send';
export interface RouteHandler {
    (send: Send): Middleware;
}

/**
 *
 * @param spec
 * @param routeHandlers
 */
export const getRouteMiddleware = (
    spec,
    routeHandlers: FnMap,
    send: Send,
): Option<Middleware[]> => {
    return maybeProp('operationId', spec)
        .flatMap((prop) => maybePropIsFn(prop, routeHandlers))
        .map((getHandler) => getHandler(send))
        .map((routeHandler) => [catchJoiErrors, routeHandler, routeHandlers.checkAccess]);
};
