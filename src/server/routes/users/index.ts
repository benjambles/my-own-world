const config = require('./config.json');

import User from "../../models/users";
import * as response from "../../lib/response";
import * as Koa from "koa";
import { responseStatuses } from '../../lib/constants';
import * as Security from '../../lib/security';
import { bindOptions } from '../';

export const sendOptions = bindOptions(config);

//--- /users ---//

/**
 * Get users, optionally filtered by parameters
 * @route [GET] /users 
 * @param ctx A Koa context object
 */
export async function getUsers(ctx: Koa.Context): Promise<void> {
    try {
        let users = await User.getUsers(ctx.request.query.count, ctx.request.query.offset);
        let userData = users.map((user) => user.data);

        return response.sendAPIResponse(ctx, { message: responseStatuses.success }, { userData });
    } catch (e) {
        ctx.throw('There was an error whilst fetching users.', 400);
    }
}

/**
 * Create a new user
 * @route [POST] /users
 * @param ctx A Koa context object 
 */
export async function createUser(ctx: Koa.Context): Promise<void> {
    try {
        let user = await User.createUser(ctx.request.body);

        response.sendAPIResponse(ctx, { message: responseStatuses.success }, { user });
    } catch (e) {
        let message = e.message || 'There was an error whilst creating the user';
        let status = e.status || 400;
        ctx.throw(message, status);
    }

}

//--- /users/:id ---//

/**
 * Get a user and return it's data object
 * @route [GET] /users/:id
 * @param ctx A Koa context object 
 */
export async function getUserById(ctx: Koa.Context): Promise<void> {
    try {
        let user = await User.getUserById(ctx.params.id);

        return response.sendAPIResponse(ctx, { message: responseStatuses.success }, user.data);
    } catch (e) {
        ctx.throw('There was an error whilst fetching the user.', 400);
    }
}

/**
 * Update a user and return the updated data
 * @route [PUT] /users/:id
 * @param ctx A Koa context object 
 */
export async function updateUser(ctx: Koa.Context): Promise<void> {
    try {
        let user = await User.getUserById(ctx.params.id);
        let updatedUser = await user.update(ctx.request.body);

        return response.sendAPIResponse(ctx, { message: responseStatuses.success }, user.data);
    } catch (e) {
        ctx.throw('There was an error whilst updating the user.', 400);
    }
}

/**
 * Mark a user as deleted
 * @route [DELETE] /users/:id
 * @param ctx 
 */
export async function deleteUserById(ctx: Koa.Context): Promise<void> {
    try {
        let user = await User.getUserById(ctx.params.id);
        let deletedUser = await user.delete();

        return response.sendAPIResponse(ctx, { message: responseStatuses.success }, {});
    } catch (e) {
        ctx.throw('There was an error whilst deleting the user.', 400);
    }
}

//--- /users/authenticate ---//

/**
 * fetch related user and if found test their password
 * @route [POST] /users/authenticate
 * @param ctx A Koa context object 
 */
export async function authenticateUser(ctx: Koa.Context): Promise<void> {
    try {
        let user = await User.getUserByEmail(ctx.request.body.email);
        let isValid = await user.validatePassword(ctx.request.body.password);

        if (!isValid) {
            ctx.throw('Unauthorized access', 401);
        }

        let token = await Security.getToken(user);

        return response.sendAPIResponse(ctx, { message: responseStatuses.success }, { token, user: user.data });
    } catch (e) {
        let message = e.message || 'There was an error whilst authenticating the user.';
        let status = e.status || 400;
        ctx.throw(message, status);
    }
}