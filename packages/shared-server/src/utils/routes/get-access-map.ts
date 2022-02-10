import { KoaContext } from '../../index.js';
import { isAdmin } from '../access-checks/is-admin.js';
import { isUser } from '../access-checks/is-user.js';

/**
 * Map of functions to test against roles for granting access to endpoints
 * TODO:: Add types
 */
export function getAccessMap(additionalChecks = {}) {
    return (ctx: KoaContext): Function => {
        return (role) => {
            const checks = {
                'role:admin': (_ctx) => isAdmin(_ctx),
                'role:user': (_ctx) => isUser(_ctx),
                ...additionalChecks,
            };

            return checks[role] ? checks[role](ctx) : false;
        };
    };
}
