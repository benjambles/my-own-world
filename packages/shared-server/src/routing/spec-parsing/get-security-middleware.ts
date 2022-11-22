import Koa from 'koa';
import { Option } from 'ts-option';
import { setAccessRoles } from '../../koa/middleware/set-access-roles.js';
import { maybePropOr } from '../../utils/functional/maybe-prop.js';

/**
 * Takes an object representing a routes security configuration and returns an array containing
 * the Koa middleware for running security checks on the route
 * @param spec
 */
export function getSecurityMiddleware(spec): Option<Koa.Middleware[]> {
    return maybePropOr([], 'security', spec).map((items) => {
        return items.filter((item) => item.http).map(setAccessRoles);
    });
}
