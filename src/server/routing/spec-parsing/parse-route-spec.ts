import maybeProp from '../../utils/functional/maybe-prop';
import maybePropIsFn from '../../utils/functional/maybe-prop-is-function';
import catchJoiErrors from '../../utils/middleware/catch-joi-errors';

/**
 *
 * @param spec
 * @param routeHandlers
 */
const parseRouteSpec = (spec, routeHandlers) =>
    maybeProp('operationId', spec)
        .chain(maybePropIsFn(routeHandlers))
        .map(routeHandler => [catchJoiErrors, routeHandler, routeHandlers.checkAccess]);

export default parseRouteSpec;
