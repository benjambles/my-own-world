import Koa from 'koa';
import { Option } from 'ts-option';
import { maybePropOr } from '../../utils/functional/maybe-prop';
import { setAccessRoles } from '../../utils/middleware/set-access-roles';

/**
 * Takes an object representing a routes security configuration and returns an array containing
 * the Koa middleware for running security checks on the route
 * @param spec
 */
export const getSecurityMiddleware = (spec): Option<Koa.Middleware[]> => {
    return maybePropOr([], 'security', spec).map((items) => {
        return items.filter((item) => item.jwt).map(setAccessRoles);
    });
};
