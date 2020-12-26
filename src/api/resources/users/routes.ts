import Koa from 'koa';
import { KoaContext } from '../../../shared-server/koa/app';
import { formatData } from '../../utils/data/formatData';
import { generateRoute } from '../../utils/routes/generate-route';
import { PartsResponse, partsResponse } from '../../utils/routes/responses';
import { hmac } from '../../utils/security/encryption';
import { getDataFormatter } from '../../utils/security/get-data-formatter';
import { getToken } from '../../utils/security/jwt';
import * as identifiers from './identifiers/identifiers';
import * as users from './users';

/**
 * Get users, optionally filtered by parameters
 * @route [GET] /users
 */
export const getUsers: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst fetching users.',
        status: 400,
    },
    async (ctx: KoaContext): Promise<PartsResponse> => {
        const { limit = 10, offset = 0 }: DbGet = ctx.request.query;
        const usersData: User.UserData[] = await users.get(limit, offset);

        return partsResponse(usersData);
    },
);

/**
 * Create a new user
 * @route [POST] /users
 */
export const createUser: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst saving the user',
        status: 400,
    },
    async (ctx: KoaContext): Promise<PartsResponse> => {
        const { user, identifier } = ctx.request.body as User.Request;
        const userData: User.UserData = await users.create(
            formatData(getDataFormatter(ctx.env.ENC_TYPE, users.model)),
            user,
        );
        await identifiers.create(
            formatData(getDataFormatter(ctx.env.ENC_TYPE, identifiers.model)),
            ctx.env.ENC_TYPE,
            userData.uuid,
            identifier,
        );

        return partsResponse(userData);
    },
);

/**
 * Get a user and return it's data object
 * @route [GET] /users/:userId
 */
export const getUserById: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst fetching the user.',
        status: 400,
    },
    async (ctx: KoaContext): Promise<PartsResponse> => {
        const userData = await users.getOne(ctx.request.params.userId);

        return partsResponse(userData);
    },
);

/**
 * Update a user and return the updated data
 * @route [PUT] /users/:userId
 */
export const updateUserById: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst updating the user.',
        status: 400,
    },
    async (ctx: KoaContext): Promise<PartsResponse> => {
        const userUpdated = await users.update(
            formatData(getDataFormatter(ctx.env.ENC_TYPE, users.model)),
            ctx.request.params.userId,
            ctx.request.body as User.UserData,
        );

        return partsResponse(userUpdated);
    },
);

/**
 * Mark a user as deleted
 * @route [DELETE] /users/:userId
 */
export const deleteUserById: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst deleting the user.',
        status: 400,
    },
    async (ctx: KoaContext): Promise<PartsResponse> => {
        const userDeleted = await users.remove(ctx.request.params.userId);

        return partsResponse(userDeleted);
    },
);

/**
 * fetch related user and if found test their password
 * @route [POST] /users/authentication
 */
export const authenticateUser: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst authenticating the user.',
        status: 400,
    },
    async (ctx: KoaContext): Promise<PartsResponse> => {
        const { identifier = null, password = null } = ctx.request.body as any;
        const hashedIdentifier = hmac(ctx.env.ENC_SECRET, identifier);
        const userData = await users.authenticate(hashedIdentifier, password);
        const token = await getToken(ctx.env.JWT_SECRET, userData);

        return partsResponse({ token, user: userData });
    },
);

/**
 * Requests a magic link for user access be sent to the identifier provided
 * @route [Post] /users/access
 */
export const getAccessLink: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst requesting the access link',
        status: 400,
    },
    async (): Promise<PartsResponse> => {
        //const { email } = ctx.request.body as any;
        await users.sendMagicLink();

        return partsResponse({
            message: 'Magic link sent! Please check the email address provided.',
        });
    },
);
