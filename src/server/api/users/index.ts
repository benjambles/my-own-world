import * as Koa from 'koa';

import { isAdmin } from '../../utils';
import { bindOptions, bindCheckAccess } from '../../utils/routes';
import * as userRoutes from './routes';
import * as identifierRoutes from './identifiers/routes';
import { getObjectMemberFromString } from '../../utils/dataAccessor';

const config = require('./config.json');

// Routes on /user and /user/*
export const {
    getUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
    authenticateUser,
    getAccessLink
} = userRoutes;

// Routes on /user/:userId/identifier
export const { getUserIdentifiers, createUserIdentifier, deleteUserIdentifier } = identifierRoutes;

// Default handler for all OPTION method requests
export const sendOptions = bindOptions(config);

//--- Utility functions for handling permissions and other non-model related functionality ---//

/**
 * Throwns an error if the users roles and access rights don't match requirements
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 */
export const checkAccess = bindCheckAccess(accessMap);

/**
 * Checks to see if the user making the request is the target of the request
 * @param {Koa.Context} ctx - A Koa context object
 */
export function isCurrentUser(ctx: Koa.Context): boolean {
    const requestUuid = getRequestedUser(ctx);
    if (!requestUuid) return true; // No user was needed
    const uuid = getLoggedInUser(ctx);
    if (!uuid) return false; // No logged in user
    return uuid === requestUuid;
}

export function getLoggedInUser(ctx) {
    return getObjectMemberFromString('state.user.uuid', ctx);
}

export function getRequestedUser(ctx) {
    return getObjectMemberFromString('request.params.userId', ctx);
}

/**
 * Map of functions to test against roles for granting access to endpoints
 * @param ctx Koa context object
 * @returns {boolean}
 */
export function accessMap(ctx) {
    return role => {
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
