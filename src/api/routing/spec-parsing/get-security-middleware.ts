import Koa from 'koa';
import { compose, concat, reduce } from 'ramda';
import { Option } from 'ts-option';
import { wrap } from '../../utils/array/wrap';
import { maybeProp, maybePropOr } from '../../utils/functional/maybe-prop';
import { setAccessRoles } from '../../utils/middleware/set-access-roles';

/**
 * Takes an object representing a routes security configuration and returns an array containing
 * the Koa middleware for running security checks on the route
 * @param spec
 */
export const getSecurityMiddleware = (spec): Option<Koa.Middleware[]> => {
    return maybePropOr([], 'security', spec).map(
        reduce((acc, item) => {
            return maybeProp('jwt', item).match({
                some: compose(concat(acc), wrap, setAccessRoles),
                none: () => acc,
            });
        }, []),
    );
};
