import * as Koa from 'koa';

import { send } from '../../utils/routes';
import * as Security from '../../utils/security';
import * as users from './users';
import * as identifiers from './identifiers/identifiers';

//--- /users ---//

/**
 * Get users, optionally filtered by parameters
 * @route [GET] /users
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 * @returns {Promise<void>}
 */
export async function getUsers(ctx: Koa.Context, next: Function): Promise<void> {
    const defaultError = {
        message: 'There was an error whilst fetching users.',
        status: 400
    };
    await next();
    await send(ctx, defaultError, async function() {
        const usersData: User.UserData[] = await users.get({
            limit: ctx.request.query.count,
            offset: ctx.request.query.offset
        });

        return { parts: [{ usersData }] };
    });
}

/**
 * Create a new user
 * @route [POST] /users
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 * @returns {Promise<void>}
 */
export async function createUser(ctx: Koa.Context, next: Function): Promise<void> {
    const defaultError = {
        message: 'There was an error whilst saving the user',
        status: 400
    };
    await next();
    await send(ctx, defaultError, async function() {
        const userData: User.UserData = await users.create(ctx.request.body.user);
        const identifierData = await identifiers.create(userData.uuid, ctx.request.body.identifier);

        return { parts: [userData] };
    });
}

//--- /users/:userId ---//

/**
 * Get a user and return it's data object
 * @route [GET] /users/:userId
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 * @returns {Promise<void>}
 */
export async function getUserById(ctx: Koa.Context, next: Function): Promise<void> {
    const defaultError = {
        message: 'There was an error whilst fetching the user.',
        status: 400
    };
    await next();
    await send(ctx, defaultError, async function() {
        const userData = await users.getOne(ctx.request.params.userId);

        return { parts: [userData] };
    });
}

/**
 * Update a user and return the updated data
 * @route [PUT] /users/:userId
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 */
export async function updateUserById(ctx: Koa.Context, next: Function): Promise<void> {
    const defaultError = {
        message: 'There was an error whilst updating the user.',
        status: 400
    };
    await next();
    await send(ctx, defaultError, async function() {
        const userUpdated = await users.update(ctx.request.params.userId, ctx.request.body);
        return { parts: [userUpdated] };
    });
}

/**
 * Mark a user as deleted
 * @route [DELETE] /users/:userId
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 * @returns {Promise<void>}
 */
export async function deleteUserById(ctx: Koa.Context, next: Function): Promise<void> {
    const defaultError = {
        message: 'There was an error whilst deleting the user.',
        status: 400
    };
    await next();
    await send(ctx, defaultError, async function() {
        const userDeleted = await users.remove(ctx.request.params.userId);
        return { parts: [userDeleted] };
    });
}

//--- /users/authenticate ---//

/**
 * fetch related user and if found test their password
 * @route [POST] /users/authenticate
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 * @returns {Promise<void>}
 */

export async function authenticateUser(ctx: Koa.Context, next: Function): Promise<void> {
    const defaultError = {
        message: 'There was an error whilst authenticating the user.',
        status: 400
    };
    await next();

    await send(ctx, defaultError, async function() {
        const { identifier = null, password = null } = ctx.request.body;
        const userData = await users.authenticate(identifier, password);
        const token = await Security.getToken(userData);

        return { parts: [{ token, user: userData }] };
    });
}

//--- /users/access ---//

/**
 * Requests a magic link for user access be sent to the identifier provided
 * @route [Post] /users/access
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 * @returns {Promise<void>}
 */
export async function getAccessLink(ctx: Koa.Context, next: Function): Promise<void> {
    const defaultError = {
        message: 'There was an error whilst requesting the access link',
        status: 400
    };
    await next();
    await send(ctx, defaultError, async function() {
        const { email } = ctx.request.body;
        const requestSuccess = await users.sendMagicLink(email);

        return {
            parts: [{ message: 'Magic link sent! Please check the email address provided.' }]
        };
    });
}
