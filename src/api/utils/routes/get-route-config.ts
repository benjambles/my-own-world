import { compose, concat, isNil, pathOr, propEq } from 'ramda';
import { getStringParts } from '../array/get-string-parts';

/**
 * Returns the route propterty of a given object
 * @param config
 */

const getRoutePath = pathOr('', ['route', 'path']);

export const getRouteConfig = (routeConfig, state) => {
    const pathParts = getStringParts('/')(getRoutePath(state));
    return findRouteConfig(routeConfig)(pathParts);
};

/**
 * Recursively search config tree to find the configuration for a given route
 * @param {object} config - The configuration for a set of routes
 * @param {string[]} pathParts - route path steps (pathname split on /)
 */
const findRouteConfig = (config) => (pathParts: string[]) => {
    const getBasePath = getBasePathFilter(pathParts);

    if (!pathParts.length || isNil(config.paths)) {
        return { ...config, paths: [], verbs: {} };
    }

    if (pathParts.length === 1) {
        return getBasePath(config.paths);
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
const getBasePathFilter = ([rootPath = '']: string[]) => {
    return (paths) => paths.find(propEq('route', `/${rootPath}`));
};
