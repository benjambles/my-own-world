import * as Koa from 'koa';

import { isAdmin } from '../../utils/compares';
import { bindOptions, bindCheckAccess } from '../../utils/routes';
import * as userRoutes from './routes';
import * as identifierRoutes from './identifiers/routes';
import { getObjectMemberFromString } from '../../utils/dataAccessor';

const config = require('./config.json');

//--- Utility functions for handling permissions and other non-model related functionality ---//

// Default handler for all OPTION method requests
const sendOptions = bindOptions(config);

/**
 * Throws an error if the users roles and access rights don't match requirements
 * @param ctx - A Koa context object
 * @param next - Following Koa Middleware
 */
const checkAccess = bindCheckAccess(accessMap);

export const routeHandlers = {
    ...userRoutes,
    ...identifierRoutes,
    sendOptions,
    checkAccess
};

/**
 * Map of functions to test against roles for granting access to endpoints
 * @param ctx Koa context object
 */
export function accessMap(ctx: Koa.Context): Function {
    return (role: string): boolean => {
        switch (role) {
            case 'role:admin':
                return isAdmin(ctx.state);
            case 'role:owner':
                return isCurrentUser(ctx);
            default:
                return false; // role unrelated to these routes, assume no access
        }
    };
}

/**
 * Checks to see if the user making the request is the target of the request
 * @param ctx - A Koa context object
 */
export function isCurrentUser(ctx: Koa.Context): boolean {
    const requestUuid = getRequestedUser(ctx);
    if (!requestUuid) return true; // No user was needed
    const uuid = getLoggedInUser(ctx);
    if (!uuid) return false; // No logged in user
    return uuid === requestUuid;
}

export function getRequestedUser(ctx: Koa.Context): any {
    return getObjectMemberFromString('request.params.userId', ctx);
}

export function getLoggedInUser(ctx: Koa.Context): any {
    return getObjectMemberFromString('state.user.uuid', ctx);
}
