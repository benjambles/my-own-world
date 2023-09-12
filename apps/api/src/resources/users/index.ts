import {
    ClientApi,
    createResource,
} from '@benjambles/mow-server/dist/routing/create-resource.js';
import { isCurrentUser } from '@benjambles/mow-server/dist/utils/access-checks/get-authenticated-user-id.js';
import {
    created,
    noResponse,
    ok,
} from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { compareBHash } from '@benjambles/mow-server/dist/utils/security/blowfish.js';
import { hmac } from '@benjambles/mow-server/dist/utils/security/encryption.js';
import {
    getAuthTokens,
    verifyRefreshToken,
} from '@benjambles/mow-server/dist/utils/security/jwt.js';
import { randomUUID } from 'crypto';
import createError from 'http-errors';
import { DataModel } from '../../app.js';
import config from './config.js';
import { cleanResponse } from './data/users.js';

/**
 * Routes on /users and /users/*
 * Special auth routes under: /authentication
 */

export type UserClientTypes = ClientApi<typeof config>;

export default function users(dataModel: DataModel) {
    const identifiers = dataModel.getKey('identifiers');
    const tokens = dataModel.getKey('tokens');
    const users = dataModel.getKey('users');

    return createResource(config)
        .access('role:owner', isCurrentUser)
        .operation('authenticateUser', async (ctx) => {
            const { identifier, password } = ctx.request.body;
            const hashedIdentifier = hmac(ctx.state.env.ENC_SECRET, identifier);

            const userResult = await identifiers.getUserByIdentifier(hashedIdentifier);

            if (!userResult.ok) {
                throw createError(401, 'Not Authorised');
            }

            const isMatch = await compareBHash(password, userResult.value.password);

            if (!isMatch) {
                throw createError(401, 'Not Authorised');
            }

            const { accessToken, fingerprint, refreshToken } = getAuthTokens(
                ctx.state.env,
                {
                    sub: userResult.value._id,
                },
                randomUUID(),
            );

            const tokenResult = await tokens.create(userResult.value._id.toString(), {
                tokenData: {
                    accessToken,
                    refreshToken,
                    fingerprint,
                },
                lastLoggedIn: new Date(),
            });

            if (!tokenResult.ok) {
                throw createError(500, 'There was an error whilst generating the token');
            }

            ctx.cookies.set('mow-fingerprint', fingerprint);
            ctx.cookies.set('mow-refreshtoken', refreshToken);

            return ok({
                accessToken,
                fingerprint,
                refreshToken,
                user: cleanResponse(userResult.value),
            });
        })
        .operation('refreshToken', async (ctx) => {
            const { fingerprint } = ctx.request.body;
            const expiredRefreshToken = ctx.request.body.refreshToken;

            // Ensure refresh token + fingerprint are valid
            const parsedRefreshToken = verifyRefreshToken(
                ctx.state.env,
                expiredRefreshToken,
                fingerprint,
            );

            // Fetch the users tokens
            const tokenResult = await tokens.find(
                parsedRefreshToken.sub,
                expiredRefreshToken,
            );

            if (!tokenResult.ok) {
                throw createError(403, 'Expired Refresh token');
            }

            // Generate new tokens
            const { accessToken, refreshToken } = getAuthTokens(
                ctx.state.env,
                {
                    sub: parsedRefreshToken.sub,
                },
                fingerprint,
            );

            // Replace the tokens on the user object
            const userResult = await tokens.update({
                accessToken,
                expiredRefreshToken,
                refreshToken,
                userId: parsedRefreshToken.sub,
            });

            if (!userResult.ok) {
                throw createError(500, 'There was an error whilst creating the tokens');
            }

            ctx.cookies.set('mow-fingerprint', fingerprint);
            ctx.cookies.set('mow-refreshtoken', refreshToken);

            return ok({
                accessToken,
                fingerprint,
                refreshToken,
                user: cleanResponse(userResult.value),
            });
        })
        .operation('getUsers', async (ctx) => {
            const { limit, offset } = ctx.request.query;
            const userResult = await users.get(limit, offset);

            return ok(userResult.value.map(cleanResponse));
        })
        .operation('getUserById', async (ctx) => {
            const userResult = await users.find(ctx.request.params.userId);

            if (!userResult.ok) {
                throw createError(404, 'There was an error whilst getting the user');
            }

            return ok(cleanResponse(userResult.value));
        })
        .operation('deleteUserById', async (ctx) => {
            const userResult = await users.delete(ctx.request.params.userId);

            if (!userResult.ok) {
                throw createError(400, 'There was an error whilst deleting the user');
            }

            return noResponse();
        })
        .operation('createUser', async (ctx) => {
            const { identifier, user } = ctx.request.body;
            const userResult = await users.create(user);

            if (!userResult.ok) {
                throw createError(500, 'There was an error creating the user');
            }

            const idResult = await identifiers.create(
                userResult.value._id.toString(),
                identifier,
            );

            if (!idResult.ok) {
                throw createError(400, 'There was an error whilst creating the user');
                // TODO log + rollback user?
            }

            return created(cleanResponse(userResult.value));
        })
        .operation('updateUserById', async (ctx) => {
            const userResult = await users.update(
                ctx.request.params.userId,
                ctx.request.body,
            );

            if (!userResult.ok) {
                throw createError(400, 'There was an error updating the user');
            }

            return ok(cleanResponse(userResult.value));
        })
        .operation('getUserIdentifiers', async (ctx) => {
            const identitiesResult = await identifiers.find(ctx.request.params.userId);

            if (!identitiesResult.ok) {
                throw createError(404, 'No matching identities found');
            }

            return ok(identitiesResult.value);
        })
        .operation('createUserIdentifier', async (ctx) => {
            const { ok, value } = await identifiers.create(
                ctx.request.params.userId,
                ctx.request.body,
            );

            if (!ok) {
                throw createError(400, `There was an error whilst saving the identifier`);
            }

            return created(value);
        })
        .operation('deleteUserIdentifier', async (ctx) => {
            const { ok } = await identifiers.delete(
                ctx.request.params.userId,
                ctx.request.params.hash,
            );

            if (!ok) {
                throw createError(
                    400,
                    'There was an error whilst deleting the identifier',
                );
            }

            return noResponse();
        })
        .operation('getTokens', async (ctx) => {
            const tokensResult = await tokens.get(ctx.request.params.userId);

            if (!tokensResult.ok) {
                throw createError(400, 'There was an error whilst fetching the tokens');
            }

            return ok(tokensResult.value);
        })
        .operation('deleteTokens', async (ctx) => {
            const deleteResult = await users.update(ctx.request.params.userId, {
                accessTokens: [],
            });

            if (!deleteResult.ok) {
                throw createError(400, 'There was an error whilst deleting the tokens');
            }

            return noResponse();
        })
        .operation('deleteToken', async (ctx) => {
            const { fingerprint, userId } = ctx.request.params;
            const tokenResult = await tokens.delete(userId, fingerprint);

            if (!tokenResult.ok) {
                throw createError(400, 'There was an error whilst deleting the token');
            }

            return noResponse();
        })
        .get();
}
