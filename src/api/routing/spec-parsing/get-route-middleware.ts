import { Middleware } from 'koa';
import { Option } from 'ts-option';
import { FnMap, maybeProp, maybePropIsMiddleware } from '../../utils/functional/maybe-prop';
import { catchJoiErrors } from '../../utils/middleware/catch-joi-errors';

/**
 *
 * @param spec
 * @param routeHandlers
 */
export const getRouteMiddleware = (spec, routeHandlers: FnMap): Option<Middleware[]> => {
    return maybeProp('operationId', spec)
        .flatMap((prop) => maybePropIsMiddleware(prop, routeHandlers))
        .map((routeHandler) => [catchJoiErrors, routeHandler, routeHandlers.checkAccess]);
};
