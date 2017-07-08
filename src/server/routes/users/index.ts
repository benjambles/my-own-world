const config = require('./config.json');

import * as Koa from "koa";
import { send, bindOptions } from '../';
import User from "../../models/users";

export const sendOptions = bindOptions(config);

//--- /users ---//

/**
 * Get users, optionally filtered by parameters
 * @route [GET] /users 
 * @param ctx A Koa context object
 */
export async function getUsers(ctx: Koa.Context): Promise<void> {
    const error = { message: 'There was an error whilst fetching users.', status: 400 };

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
export async function createUser(ctx: Koa.Context): Promise<void> {
    const error = { message: 'There was an error whilst saving the user', status: 400 };

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
export async function getUserById(ctx: Koa.Context): Promise<void> {
    const error = { message: 'There was an error whilst fetching the user.', status: 400 };

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
export async function updateUser(ctx: Koa.Context): Promise<void> {
    const error = { message: 'There was an error whilst updating the user.', status: 400 };

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
export async function deleteUserById(ctx: Koa.Context): Promise<void> {
    const error = { message: 'There was an error whilst deleting the user.', status: 400 };

    await send(ctx, error, async function () {
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
export async function authenticateUser(ctx: Koa.Context): Promise<void> {
    const error = { message: 'There was an error whilst authenticating the user.', status: 400 };

    await send(ctx, error, async function () {
        let user = await User.getUserByEmail(ctx.request.body.email);
        let isValid = await user.validatePassword(ctx.request.body.password);
        let token = await user.getToken();

        return { parts: [{ token, user: user.data }] };
    });
}
