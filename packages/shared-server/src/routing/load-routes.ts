import { Option, some } from 'ts-option';
import { getValues } from '../utils/arrays.js';
import { maybeProp } from '../utils/functional/maybe-prop.js';
import { attachDefaultHandlers } from './attach-default-handlers.js';
import { createRoute } from './create-route.js';
import { getRouteMapping } from './get-route-mapping.js';
import { Router } from 'koa-joi-router';

/**
 * Load resources in `root` directory.
 *
 * @param root The path within which to search for route configs
 * @api private
 */
export function loadRoutes(resources, dbInstance, prefix: string = ''): Router[] {
    const getPrefixedRoute = createRoute(prefix);
    const mappedRouters = resources.map((resource) =>
        getRouter(getPrefixedRoute, resource, dbInstance),
    );

    return getValues(mappedRouters);
}

/**
 * Searches a directory for files that can be used to generate routes on our API
 * And parses them to build a JOI-Router route
 * @param getPrefixedRoute
 * @param resource
 */
function getRouter(getPrefixedRoute, resource, dbInstance): Option<Router> {
    const { config, routeHandlers, accessMap } = resource;

    const handlers = attachDefaultHandlers(config, accessMap, routeHandlers);

    return getRouteMapping(
        some([]),
        handlers,
        maybeProp('paths', config),
        dbInstance,
    ).map(getPrefixedRoute);
}
