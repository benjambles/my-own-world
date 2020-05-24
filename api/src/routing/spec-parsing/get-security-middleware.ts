import { compose } from 'fp-ts/lib/function';
import { Option, some } from 'fp-ts/lib/Option';
import Koa from 'koa';
import { reduce } from 'ramda';
import { wrap } from '../../utils/array/wrap';
import { foldConcat } from '../../utils/functional/fold-concat';
import { maybeProp } from '../../utils/functional/maybe-prop';
import { setAccessRoles } from '../../utils/middleware/set-access-roles';

const getWrappedMiddleware = compose(wrap, setAccessRoles);

/**
 * Takes an object representing a routes security configuration and returns an array containing
 * the Koa middleware for running security checks on the route
 * @param spec
 */
export const getSecurityMiddleware = (spec): Option<Koa.Middleware[]> => {
    return maybeProp('security', spec)
        .map(
            reduce(
                (acc, item) => foldConcat(acc, maybeProp('jwt', item).map(getWrappedMiddleware)),
                []
            )
        )
        .alt(some([]));
};
