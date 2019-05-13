import maybeProp from '../../utils/functional/maybe-prop';
import { maybePropIsFn } from '../../utils/functional/maybe-prop';
import catchJoiErrors from '../../utils/middleware/catch-joi-errors';
import { Option } from 'fp-ts/lib/Option';
import * as Koa from 'koa';
import { spy } from 'fp-ts/lib/Trace';

/**
 *
 * @param spec
 * @param routeHandlers
 */
const parseRouteSpec = (spec, routeHandlers: fnMap): Option<Koa.Middleware[]> => {
    return maybeProp('operationId', spec)
        .chain(maybePropIsFn(routeHandlers))
        .map(routeHandler => [catchJoiErrors, routeHandler, routeHandlers.checkAccess]);
};

export default parseRouteSpec;
