import { RouteHandler } from '../../routing/spec-parsing/get-route-middleware.js';
import { formatData } from '../../utils/data/formatData.js';
import { paramToNumber } from '../../utils/data/param-to-number.js';
import { partsResponse } from '../../utils/routes/responses.js';
import { hmac } from '../../utils/security/encryption.js';
import { getDataFormatter } from '../../utils/security/get-data-formatter.js';
import { getToken } from '../../utils/security/jwt.js';
import * as identifiers from './identifiers/identifiers.js';
import * as users from './users.js';

/**
 * Get users, optionally filtered by parameters
 * @route [GET] /users
 */
export const getUsers: RouteHandler = (send, dbInstance) => {
    const defaultError = {
        message: 'There was an error whilst fetching users.',
        status: 400,
    };
    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const { limit, offset } = ctx.request.query;
            const usersData: User.UserData[] = await users.get(
                dbInstance,
                paramToNumber(limit, 10),
                paramToNumber(offset, 10),
            );

            return partsResponse(usersData);
        });
    };
};

/**
 * Create a new user
 * @route [POST] /users
 */
export const createUser: RouteHandler = (send, dbInstance) => {
    const defaultError = {
        message: 'There was an error whilst saving the user',
        status: 400,
    };
    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const { user, identifier } = ctx.request.body as User.Request;
            const userData: User.UserData = await users.create(
                dbInstance,
                formatData(getDataFormatter(ctx.env.ENC_TYPE, users.model)),
                user,
            );
            await identifiers.create(
                dbInstance,
                formatData(getDataFormatter(ctx.env.ENC_TYPE, identifiers.model)),
                ctx.env.ENC_TYPE,
                userData.uuid,
                identifier,
            );

            return partsResponse(userData);
        });
    };
};

/**
 * Get a user and return it's data object
 * @route [GET] /users/:userId
 */
export const getUserById: RouteHandler = (send, dbInstance) => {
    const defaultError = {
        message: 'There was an error whilst fetching the user.',
        status: 400,
    };
    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const userData = await users.getOne(dbInstance, ctx.request.params.userId);

            return partsResponse(userData);
        });
    };
};

/**
 * Update a user and return the updated data
 * @route [PUT] /users/:userId
 */
export const updateUserById: RouteHandler = (send, dbInstance) => {
    const defaultError = {
        message: 'There was an error whilst updating the user.',
        status: 400,
    };
    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const userUpdated = await users.update(
                dbInstance,
                formatData(getDataFormatter(ctx.env.ENC_TYPE, users.model)),
                ctx.request.params.userId,
                ctx.request.body as User.UserData,
            );

            return partsResponse(userUpdated);
        });
    };
};

/**
 * Mark a user as deleted
 * @route [DELETE] /users/:userId
 */
export const deleteUserById: RouteHandler = (send, dbInstance) => {
    const defaultError = {
        message: 'There was an error whilst deleting the user.',
        status: 400,
    };
    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const userDeleted = await users.remove(dbInstance, ctx.request.params.userId);

            return partsResponse(userDeleted);
        });
    };
};

/**
 * fetch related user and if found test their password
 * @route [POST] /users/authentication
 */
export const authenticateUser: RouteHandler = (send, dbInstance) => {
    const defaultError = {
        message: 'There was an error whilst authenticating the user.',
        status: 400,
    };
    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const { identifier = null, password = null } = ctx.request.body as any;
            const hashedIdentifier = hmac(ctx.env.ENC_SECRET, identifier);
            const userData = await users.authenticate(dbInstance, hashedIdentifier, password);
            const token = await getToken(ctx.env.JWT_SECRET, userData);

            return partsResponse({ token, user: userData });
        });
    };
};

/**
 * Requests a magic link for user access be sent to the identifier provided
 * @route [Post] /users/access
 */
export const getAccessLink: RouteHandler = (send) => {
    const defaultError = {
        message: 'There was an error whilst requesting the access link',
        status: 400,
    };
    return async (ctx) => {
        await send(ctx, defaultError, async () => {
            //const { email } = ctx.request.body as any;
            await users.sendMagicLink();

            return partsResponse({
                message: 'Magic link sent! Please check the email address provided.',
            });
        });
    };
};
