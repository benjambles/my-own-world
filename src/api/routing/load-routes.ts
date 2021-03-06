import { readdirSync } from 'fs';
import { resolve } from 'path';
import { Option, some } from 'ts-option';
import { getValues } from '../utils/array/get-somes';
import { maybeIsDirectory } from '../utils/fs/is-directory';
import { requireFilePath } from '../utils/fs/require-filepath';
import { maybeProp } from '../utils/functional/maybe-prop';
import { createRoute } from './create-route';
import { getRouteMapping } from './get-route-mapping';

/**
 * Load resources in `root` directory.
 *
 * @param root The path within which to search for route configs
 * @api private
 */
export const loadRoutes = (root: string, prefix: string = ''): Router[] => {
    const getPrefixedRouter = getRouter(root, createRoute(prefix));
    const mappedRouters = readdirSync(root).map(getPrefixedRouter);

    return getValues(mappedRouters);
};

/**
 * Searches a directory for files that can be used to generate routes on our API
 * And parses them to build a JOI-Router route
 * @param rootPath
 * @param getPrefixedRoute
 */
const getRouter = (rootPath: string, getPrefixedRoute) => (name: string): Option<Router> => {
    return maybeIsDirectory(resolve(rootPath, name))
        .map(requireRouteFiles)
        .flatMap(([moduleContents, config]) =>
            getRouteMapping(some([]), moduleContents.routeHandlers, maybeProp('paths', config)),
        )
        .map(getPrefixedRoute);
};

/**
 *
 */
const requireRouteFiles = (filePath: string) => {
    return ['index.js', 'config.json'].map((fileName) => requireFilePath(filePath, fileName));
};
