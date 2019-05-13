import { Option, some } from 'fp-ts/lib/Option';
import * as Koa from 'koa';
import { reduce } from 'ramda';
import foldConcat from '../../utils/functional/fold-concat';
import maybeProp from '../../utils/functional/maybe-prop';
import setAccessRoles from '../../utils/middleware/set-access-roles';

/**
 * Takes an object representing a routes security configuration and returns an array containing
 * the Koa middleware for running security checks on the route
 * @param spec
 */
const parseSecuritySpec = (spec): Option<Koa.Middleware[]> =>
    maybeProp('security', spec)
        .map(
            reduce(
                (acc, item) =>
                    foldConcat(acc, maybeProp('jwt', item).map(jwt => [setAccessRoles(jwt)])),
                []
            )
        )
        .alt(some([]));

export default parseSecuritySpec;
