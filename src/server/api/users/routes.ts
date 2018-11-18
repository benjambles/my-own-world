import * as Koa from 'koa';
import * as Security from '../../utils/security';
import * as identifiers from './identifiers/identifiers';
import * as users from './users';
import { generateRoute } from '../../utils/routes';

/**
 * Get users, optionally filtered by parameters
 * @route [GET] /users
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 * @returns {Promise<void>}
 */
export const getUsers: Function = generateRoute(
    {
        message: 'There was an error whilst fetching users.',
        status: 400
    },
    async ctx => {
        const { limit = 10, offset = 0 }: dbGet = ctx.request.query;
        const usersData: User.UserData[] = await users.get(limit, offset);

        return { parts: [usersData] };
    }
);

/**
 * Create a new user
 * @route [POST] /users
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 * @returns {Promise<void>}
 */
export const createUser: Function = generateRoute(
    {
        message: 'There was an error whilst saving the user',
        status: 400
    },
    async ctx => {
        const { user, identifier } = ctx.request.body as User.Request;
        const userData: User.UserData = await users.create(user);
        await identifiers.create(userData.uuid, identifier);

        return { parts: [userData] };
    }
);

/**
 * Get a user and return it's data object
 * @route [GET] /users/:userId
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 * @returns {Promise<void>}
 */
export const getUserById: Function = generateRoute(
    {
        message: 'There was an error whilst fetching the user.',
        status: 400
    },
    async ctx => {
        const userData = await users.getOne(ctx.request.params.userId);

        return { parts: [userData] };
    }
);

/**
 * Update a user and return the updated data
 * @route [PUT] /users/:userId
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 */
export const updateUserById: Function = generateRoute(
    {
        message: 'There was an error whilst updating the user.',
        status: 400
    },
    async ctx => {
        const userUpdated = await users.update(ctx.request.params.userId, ctx.request
            .body as User.UserData);
        return { parts: [userUpdated] };
    }
);

/**
 * Mark a user as deleted
 * @route [DELETE] /users/:userId
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 * @returns {Promise<void>}
 */
export const deleteUserById: Function = generateRoute(
    {
        message: 'There was an error whilst deleting the user.',
        status: 400
    },
    async ctx => {
        const userDeleted = await users.remove(ctx.request.params.userId);
        return { parts: [userDeleted] };
    }
);

/**
 * fetch related user and if found test their password
 * @route [POST] /users/authentication
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 * @returns {Promise<void>}
 */

export const authenticateUser: Function = generateRoute(
    {
        message: 'There was an error whilst authenticating the user.',
        status: 400
    },
    async ctx => {
        const { identifier = null, password = null } = ctx.request.body as any;
        const userData = await users.authenticate(identifier, password);
        const token = await Security.getToken(userData);

        return { parts: [{ token, user: userData }] };
    }
);

/**
 * Requests a magic link for user access be sent to the identifier provided
 * @route [Post] /users/access
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 * @returns {Promise<void>}
 */
export const getAccessLink: Function = generateRoute(
    {
        message: 'There was an error whilst requesting the access link',
        status: 400
    },
    async ctx => {
        const { email } = ctx.request.body as any;
        await users.sendMagicLink(email);

        return {
            parts: [{ message: 'Magic link sent! Please check the email address provided.' }]
        };
    }
);
