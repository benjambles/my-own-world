import * as Koa from 'koa';

import { isAdmin, isTrue } from '../../utils';
import { bindOptions } from '../../utils/routes';
import * as userRoutes from './routes';
import * as identifierRoutes from './identifiers/routes';

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
export async function checkAccess(ctx: Koa.Context, next: Function): Promise<void> {
    const roles = ctx.state.accessRoles || [];

    if (roles.length) {
        const hasAccess: boolean = roles
            .map(role => {
                switch (role) {
                    case 'role:admin':
                        return isAdmin(ctx.state);
                    case 'role:owner':
                        return isCurrentUser(ctx);
                    default:
                        return false; // role unrelated to these routes, assume no access
                }
            })
            .some(isTrue);

        if (!hasAccess) {
            ctx.throw(401, 'Unauthorised access to endpoint');
        }
    }
}

/**
 * Checks to see if the user making the request is the target of the request
 * @param {Koa.Context} ctx - A Koa context object
 */
function isCurrentUser(ctx: Koa.Context): boolean {
    const user = ctx.state.user;
    const requestUuid = ctx.request.params.userId;
    if (!requestUuid) return true;
    if (!user || !user.uuid) return false;
    return user.uuid === requestUuid;
}
