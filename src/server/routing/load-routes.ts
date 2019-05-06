import * as Maybe from 'folktale/maybe';
import * as fs from 'fs';
import { resolve } from 'path';
import { compose, liftN, prop, when, tap } from 'ramda';
import { compact } from 'ramda-adjunct';
import isDirectory from '../utils/fs/is-directory';
import requireFilePath from '../utils/fs/require-filepath';
import getOrElse from '../utils/functional/get-or-else';
import maybeProp from '../utils/functional/maybe-prop';
import createRoute from './create-route';
import getRouteMapping from './get-route-mapping';

/**
 * Load resources in `root` directory.
 *
 * @param root The path within which to search for route configs
 * @api private
 */
const loadRoutes = (root: string, prefix: string = ''): iRouter[] => {
    const getPrefixedRoute = createRoute(prefix);

    return compact(
        fs.readdirSync(root).map((name: string) =>
            compose(
                getOrElse(null),
                when(isDirectory, filePath =>
                    getPrefixedRoutesFromMap(getPrefixedRoute)(
                        requireFilePath(filePath, 'index.js'),
                        requireFilePath(filePath, 'config.json')
                    )
                )
            )(resolve(root, name))
        )
    );
};

export default loadRoutes;

/**
 *
 * @param routeBinder
 */
const getPrefixedRoutesFromMap = routeBinder =>
    liftN(2, (moduleContents, config) =>
        getRouteMapping(
            Maybe.of([]),
            prop('routeHandlers', moduleContents),
            maybeProp('paths', config)
        ).chain(routeBinder)
    );
