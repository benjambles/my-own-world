import { Option } from 'fp-ts/lib/Option';
import * as Koa from 'koa';
import { maybeProp, maybePropIsFn } from '../../utils/functional/maybe-prop';
import catchJoiErrors from '../../utils/middleware/catch-joi-errors';

/**
 *
 * @param spec
 * @param routeHandlers
 */
const getRouteMiddleware = (spec, routeHandlers: fnMap): Option<Koa.Middleware[]> =>
    maybeProp('operationId', spec)
        .chain(maybePropIsFn(routeHandlers))
        .map(routeHandler => [catchJoiErrors, routeHandler, routeHandlers.checkAccess]);

export default getRouteMiddleware;
