import { Option, some } from 'ts-option';
import { getValues } from '../utils/array/get-somes.js';
import { maybeProp } from '../utils/functional/maybe-prop.js';
import { createRoute } from './create-route.js';
import { getRouteMapping } from './get-route-mapping.js';

/**
 * Load resources in `root` directory.
 *
 * @param root The path within which to search for route configs
 * @api private
 */
export const loadRoutes = (resources, dbInstance, prefix: string = ''): Router[] => {
    const getPrefixedRoute = createRoute(prefix);
    const mappedRouters = resources.map((resource) =>
        getRouter(getPrefixedRoute, resource, dbInstance),
    );

    return getValues(mappedRouters);
};

/**
 * Searches a directory for files that can be used to generate routes on our API
 * And parses them to build a JOI-Router route
 * @param getPrefixedRoute
 * @param resource
 */
const getRouter = (getPrefixedRoute, resource, dbInstance): Option<Router> => {
    const { config, routeHandlers } = resource;

    return getRouteMapping(some([]), routeHandlers, maybeProp('paths', config), dbInstance).map(
        getPrefixedRoute,
    );
};
