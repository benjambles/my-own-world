import type Koa from 'koa';
import type { Option } from 'ts-option';
import { maybePropOr } from '../../utils/functional/maybe-prop.js';
import { setAccessRoles } from '../../utils/middleware/set-access-roles.js';

/**
 * Takes an object representing a routes security configuration and returns an array containing
 * the Koa middleware for running security checks on the route
 * @param spec
 */
export function getSecurityMiddleware(spec): Option<Koa.Middleware[]> {
    return maybePropOr([], 'security', spec).map((items) => {
        return items.filter((item) => item.jwt).map(setAccessRoles);
    });
}
