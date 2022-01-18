import type { KoaContext } from '@benjambles/mow-server/dist/koa/app.js';
import { isAdmin } from '../compares/is-admin.js';
import { isUser } from '../compares/is-user.js';

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