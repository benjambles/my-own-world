const config = require('./config.json');

import * as Koa from "koa";
import { send, bindOptions } from '../';
import User from "./user";
import { isTrue, isAdmin } from '../../lib/utils';

export const sendOptions = bindOptions(config);

//--- /users ---//

/**
 * Get users, optionally filtered by parameters
 * @route [GET] /users 
 * @param ctx A Koa context object
 */
export async function getUsers(ctx: Koa.Context, next: Function): Promise<void> {
    const error = { message: 'There was an error whilst fetching users.', status: 400 };
    await next();
    await send(ctx, error, async function () {
        let users = await User.getUsers(ctx.request.query.count, ctx.request.query.offset);
        let userData = users.map((user) => user.data);

        return { parts: [{ userData }] };
    });
}

/**
 * Create a new user
 * @route [POST] /users
 * @param ctx A Koa context object 
 */
export async function createUser(ctx: Koa.Context, next: Function): Promise<void> {
    const error = { message: 'There was an error whilst saving the user', status: 400 };
    await next();
    await send(ctx, error, async function () {
        let user = await User.createUser(ctx.request.body);

        return { parts: [user.data] };
    });
}

//--- /users/:id ---//

/**
 * Get a user and return it's data object
 * @route [GET] /users/:id
 * @param ctx A Koa context object 
 */
export async function getUserById(ctx: Koa.Context, next: Function): Promise<void> {
    const error = { message: 'There was an error whilst fetching the user.', status: 400 };
    await next();
    await send(ctx, error, async function () {
        let user = await User.getUserById(ctx.params.id);

        return { parts: [user.data] };
    });
}

/**
 * Update a user and return the updated data
 * @route [PUT] /users/:id
 * @param ctx A Koa context object 
 */
export async function updateUser(ctx: Koa.Context, next: Function): Promise<void> {
    const error = { message: 'There was an error whilst updating the user.', status: 400 };
    await next();
    await send(ctx, error, async function () {
        let user = await User.getUserById(ctx.params.id);
        let updatedUser = await user.update(ctx.request.body);

        return { parts: [user.data] };
    });
}

/**
 * Mark a user as deleted
 * @route [DELETE] /users/:id
 * @param ctx 
 */
export async function deleteUserById(ctx: Koa.Context, next: Function): Promise<void> {
    const error = { message: 'There was an error whilst deleting the user.', status: 400 };
    await next();
    await send(ctx, error, async function () {
        // Check that the account is either the owner of the account, or an admin
        let user = await User.getUserById(ctx.params.id);
        let deletedUser = await user.delete();

        return { parts: [user.data] };
    });
}

//--- /users/authenticate ---//

/**
 * fetch related user and if found test their password
 * @route [POST] /users/authenticate
 * @param ctx A Koa context object 
 */

export async function authenticateUser(ctx: Koa.Context, next: Function): Promise<void> {
    const error = { message: 'There was an error whilst authenticating the user.', status: 400 };
    await next();
    await send(ctx, error, async function () {
        let user = await User.getUserByEmail(ctx.request.body.email);
        let isValid = await user.validatePassword(ctx.request.body.password);
        let token = await user.getToken();

        return { parts: [{ token, user: user.data }] };
    });
}


//--- Utility functions for handling permissions and other non-model related functionality ---//

/**
 * Throwns an error if the users roles and access rights don't match requirements
 * @param ctx Koa context
 * @param next The next middleware to run
 */
export async function checkAccess(ctx: Koa.Context, next: Function): Promise<void> {
    const roles = ctx.state.accessRoles || [];

    let access = roles.map((role) => {
        switch (role) {
            case 'role:admin':
                return isAdmin(ctx.state);
            case 'role:owner':
                return isCurrentUser(ctx);
            default:
                return true; // role unrelated to these routes, assume access
        }
    }).every(isTrue);

    if (!access) {
        ctx.throw(401, 'Unauthorised access to endpoint');
    }

    await next(); //for keeping to Koa middleware requirements, if no post middleware exists this is auto handled by a no-op promise
}

/**
 * Checks to see if the user making the request is the target of the request
 * @param ctx A Koa context with JWT state provided
 */
function isCurrentUser(ctx: Koa.Context): boolean {
    return (ctx.state.user && ctx.state.user.uuid && ctx.state.user.uuid === ctx.params.id);
}