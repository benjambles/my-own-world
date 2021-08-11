import { getStringParts } from '../array/get-string-parts.js';

export const getRouteConfig = (routeConfig, state) => {
    const pathParts = getStringParts('/', state.route?.path ?? '');
    return findRouteConfig(routeConfig)(pathParts);
};

/**
 * Recursively search config tree to find the configuration for a given route
 * @param {object} config - The configuration for a set of routes
 * @param {string[]} pathParts - route path steps (pathname split on /)
 */
const findRouteConfig = (config) => (pathParts: string[]) => {
    const getBasePath = getBasePathFilter(pathParts);

    if (!pathParts.length || !config.paths) {
        return { ...config, paths: [], verbs: {} };
    }

    if (pathParts.length === 1) {
        return getBasePath(config.paths);
    }

    const [root, path, ...rest] = pathParts;
    const newPathParts = [[root, path].join('/')].concat(rest);

    return findRouteConfig(getBasePath(config.paths))(newPathParts);
};

/**
 * Checks to see if the given route parts are the current root of the API
 * @param pathParts
 */
const getBasePathFilter = ([rootPath = '']: string[]) => {
    return (paths) => paths.find((path) => path.route === `/${rootPath}`);
};
