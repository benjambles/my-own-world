import { Context } from 'koa';
import { isAdmin } from '../access-checks/is-admin.js';
import { isUser } from '../access-checks/is-user.js';

interface AccessCheckers {
    [key: string]: (ctx: Context) => boolean;
}

/**
 * Map of functions to test against roles for granting access to endpoints
 * TODO:: Add types
 */
export function getAccessMap(additionalChecks: AccessCheckers = {}) {
    const checks: AccessCheckers = {
        'role:admin': isAdmin,
        'role:user': isUser,
        ...additionalChecks,
    };

    return (ctx: Context) => {
        return (role: string): boolean => checks[role]?.(ctx) ?? false;
    };
}
