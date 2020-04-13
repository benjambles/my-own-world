import { sequenceT } from 'fp-ts/lib/Apply';
import { catOptions } from 'fp-ts/lib/Array';
import { ioEither } from 'fp-ts/lib/IOEither';
import { none, Option, some } from 'fp-ts/lib/Option';
import * as fs from 'fs';
import { resolve } from 'path';
import { compose, map, prop } from 'ramda';
import { maybeIsDirectory } from '../utils/fs/is-directory';
import requireFilePath from '../utils/fs/require-filepath';
import getOrElse from '../utils/functional/get-or-else';
import { maybeProp } from '../utils/functional/maybe-prop';
import createRoute from './create-route';
import getRouteMapping from './get-route-mapping';

/**
 * Load resources in `root` directory.
 *
 * @param root The path within which to search for route configs
 * @api private
 */
export default function loadRoutes(root: string, prefix: string = ''): iRouter[] {
    return compose(catOptions, map(getRouter(root, createRoute(prefix))), fs.readdirSync)(root);
}

/**
 * Searches a directory for files that can be used to generate routes on our API
 * And parses them to build a JOI-Router route
 * @param rootPath
 * @param getPrefixedRoute
 */
function getRouter(rootPath, getPrefixedRoute) {
    return (name: string): Option<iRouter> =>
        maybeIsDirectory(resolve(rootPath, name))
            .map(requireFilesOrNone)
            .chain(([moduleContents, config]) =>
                getRouteMapping(
                    some([]),
                    prop('routeHandlers', moduleContents),
                    maybeProp('paths', config)
                )
            )
            .map(getPrefixedRoute);
}

/**
 *
 * @param index
 * @param config
 */
function requireFiles(index: string, config: string) {
    return (filePath: string) =>
        sequenceT(ioEither)(
            requireFilePath(filePath, index),
            requireFilePath(filePath, config)
        ).run();
}

/**
 *
 */
const requireFilesOrNone = compose(getOrElse(none), requireFiles('index.js', 'config.json'));
