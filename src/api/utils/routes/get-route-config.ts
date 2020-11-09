import { compose, concat, equals, isNil, prop } from 'ramda';
import { getFirstFiltered } from '../array/get-first-filtered';
import { getStringParts } from '../array/get-string-parts';
import { maybeHead } from '../array/maybe-head';
import { wrap } from '../array/wrap';

/**
 * Returns the route propterty of a given object
 * @param config
 */
const getRoute = prop('route');

export const getRouteConfig = (routeConfig) => {
    return compose(findRouteConfig(wrap(routeConfig)), getStringParts('/'), getRoute);
};

/**
 * Recursively search config tree to find the configuration for a given route
 * @param {object} config - The configuration for a set of routes
 * @param {string[]} pathParts - route path steps (pathname split on /)
 */
const findRouteConfig = (config) => (pathParts: string[]) => {
    const getBasePath = getBasePathFilter(pathParts);

    if (
        !pathParts.length ||
        isNil(config.paths) ||
        (pathParts.length === 1 && getBasePath(config))
    ) {
        return config;
    }

    const findRouteFromBasePath = compose(findRouteConfig, getBasePath);
    const [root, path, ...rest] = pathParts;
    const newPathParts = concat([[root, path].join('/')], rest);

    return findRouteFromBasePath(config.paths)(newPathParts);
};

/**
 * Checks to see if the given route parts are the current root of the API
 * @param pathParts
 */
const getBasePathFilter = (pathParts: string[]) => {
    return getFirstFiltered(
        compose(equals(`/${maybeHead(pathParts).getOrElseValue('')}`), getRoute),
    );
};
