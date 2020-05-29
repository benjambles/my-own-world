import { Option } from 'fp-ts/lib/Option';
import { Middleware } from 'koa';
import { maybeProp, maybePropIsMiddleware } from '../../utils/functional/maybe-prop';
import { catchJoiErrors } from '../../utils/middleware/catch-joi-errors';
import { FnMap } from '../../utils/functional/maybe-prop';

/**
 *
 * @param spec
 * @param routeHandlers
 */
export const getRouteMiddleware = (spec, routeHandlers: FnMap): Option<Middleware[]> => {
    return maybeProp('operationId', spec)
        .chain((prop) => maybePropIsMiddleware(prop, routeHandlers))
        .map((routeHandler) => [catchJoiErrors, routeHandler, routeHandlers.checkAccess]);
};
