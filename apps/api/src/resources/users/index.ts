import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import { isCurrentUser } from '@benjambles/mow-server/dist/utils/access-checks/get-authenticated-user-id.js';
import {
    created,
    noResponse,
    ok,
} from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { hmac } from '@benjambles/mow-server/dist/utils/security/encryption.js';
import {
    getAuthTokens,
    verifyRefreshToken,
} from '@benjambles/mow-server/dist/utils/security/jwt.js';
import { randomUUID } from 'crypto';
import { DataModel } from '../../app.js';
import config from './config.js';
import { cleanResponse } from './data/users.js';

/**
 * Routes on /users and /users/*
 * Special auth routes under: /authentication
 */

export default function users(dataModel: DataModel) {
    const identifiers = dataModel.getKey('identifiers');
    const tokens = dataModel.getKey('tokens');
    const users = dataModel.getKey('users');

    return createResource(config)
        .access('role:owner', isCurrentUser)
        .operation('authenticateUser', async (ctx) => {
            const { identifier, password } = ctx.request.body;
            const hashedIdentifier = hmac(ctx.state.env.ENC_SECRET, identifier);

            const user = await identifiers.authenticate(hashedIdentifier, password);

            const { accessToken, fingerprint, refreshToken } = getAuthTokens(
                ctx.state.env,
                {
                    sub: user._id,
                },
                randomUUID(),
            );

            const updatedUser = await tokens.create(user._id.toString(), {
                tokenData: {
                    accessToken,
                    refreshToken,
                    fingerprint,
                },
                lastLoggedIn: new Date(),
            });

            ctx.cookies.set('fingerprint', fingerprint);
            ctx.cookies.set('refreshtoken', refreshToken);

            return ok({
                accessToken,
                refreshToken,
                user: cleanResponse(updatedUser),
            });
        })
        .operation('refreshToken', async (ctx) => {
            const fingerprint = ctx.cookies.get('fingerprint');
            const oldRefreshToken = ctx.request.body.refreshToken;

            // Ensure refresh token + fingerprint are valid
            const parsedRefreshToken = verifyRefreshToken(
                ctx.state.env,
                oldRefreshToken,
                fingerprint,
            );

            // Fetch the users tokens
            const [matchedToken] = await tokens.find(
                parsedRefreshToken.sub,
                oldRefreshToken,
            );

            if (!matchedToken) {
                throw new Error('Expired Refresh token');
            }

            // Generate new tokens
            const { accessToken, refreshToken } = getAuthTokens(
                ctx.state.env,
                {
                    sub: parsedRefreshToken.sub,
                },
                randomUUID(),
            );

            // Replace the tokens on the user object
            const updatedUser = await tokens.update(
                parsedRefreshToken.sub,
                refreshToken,
                accessToken,
            );

            ctx.cookies.set('fingerprint', fingerprint);
            ctx.cookies.set('refreshtoken', refreshToken);

            return ok({
                accessToken,
                refreshToken,
                user: cleanResponse(updatedUser),
            });
        })
        .operation('getUsers', async (ctx) => {
            const { limit, offset } = ctx.request.query;
            const data = await users.get(limit, offset);

            return ok(data.map(cleanResponse));
        })
        .operation('getUserById', async (ctx) => {
            const data = await users.find(ctx.request.params.userId);

            return ok(cleanResponse(data));
        })
        .operation('deleteUserById', async (ctx) => {
            await users.delete(ctx.request.params.userId);

            return noResponse();
        })
        .operation('createUser', async (ctx) => {
            const { identifier, user } = ctx.request.body;
            const userData = await users.create(user);
            await identifiers.create(userData._id.toString(), identifier);

            return created(cleanResponse(userData));
        })
        .operation('updateUserById', async (ctx) => {
            const data = await users.update(ctx.request.params.userId, ctx.request.body);

            return ok(cleanResponse(data));
        })
        .operation('getUserIdentifiers', async (ctx) => {
            const data = await identifiers.find(
                ctx.state.env.ENC_SECRET,
                ctx.request.params.userId,
            );

            return ok(data);
        })
        .operation('createUserIdentifier', async (ctx) => {
            const data = await identifiers.create(
                ctx.request.params.userId,
                ctx.request.body,
            );

            return created(data);
        })
        .operation('deleteUserIdentifier', async (ctx) => {
            await identifiers.delete(ctx.request.params.userId, ctx.request.params.hash);

            return noResponse();
        })
        .operation('getTokens', async (ctx) => {
            const userTokens = await tokens.get(ctx.request.params.userId);

            return ok(userTokens);
        })
        .operation('deleteTokens', async (ctx) => {
            await users.update(ctx.request.params.userId, {
                accessTokens: [],
            });

            return noResponse();
        })
        .operation('deleteToken', async (ctx) => {
            const { fingerprint, userId } = ctx.request.params;
            await tokens.delete(fingerprint, userId);

            return noResponse();
        })
        .get();
}
