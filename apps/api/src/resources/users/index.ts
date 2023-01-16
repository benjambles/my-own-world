import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import { isCurrentUser } from '@benjambles/mow-server/dist/utils/access-checks/get-authenticated-user-id.js';
import { hmac } from '@benjambles/mow-server/dist/utils/security/encryption.js';
import { getToken } from '@benjambles/mow-server/dist/utils/security/jwt.js';
import { DataModel } from '../../app.js';
import config from './config.js';
import { UserResponse } from './users.js';

/**
 * Routes on /users and /users/*
 * Special auth routes under: /authentication
 */
export default function users(dataModel: DataModel, prefix: string) {
    const users = dataModel.get('users');
    const identifiers = dataModel.get('identifiers');

    const resource = createResource(config)
        .access('role:owner', isCurrentUser)
        .operation('authenticateUser', async (ctx) => {
            const { identifier, password } = ctx.request.body;
            const hashedIdentifier = hmac(ctx.env.ENC_SECRET, identifier);
            const userData = await users.authenticate(hashedIdentifier, password);
            const token = await getToken(ctx.env.JWT_SECRET, userData);

            return { token, user: userData };
        })
        .operation('getUsers', async (ctx) => {
            const { limit, offset } = ctx.request.query;
            return await users.get(limit, offset);
        })
        .operation('getUserById', async (ctx) => {
            return await users.find(ctx.request.params.userId);
        })
        .operation('deleteUserById', async (ctx) => {
            return await users.delete(ctx.request.params.userId);
        })
        .operation('createUser', async (ctx) => {
            const { user, identifier } = ctx.request.body;
            const userData: UserResponse = await users.create(user);
            return await identifiers.create(userData._id.toString(), identifier);
        })
        .operation('updateUserById', async (ctx) => {
            return await users.update(ctx.request.params.userId, ctx.request.body);
        })
        .operation('getUserIdentifiers', async (ctx) => {
            return await identifiers.find(ctx.env.ENC_SECRET, ctx.request.params.userId);
        })
        .operation('createUserIdentifier', async (ctx) => {
            return await identifiers.create(ctx.request.params.userId, ctx.request.body);
        })
        .operation('deleteUserIdentifier', async (ctx) => {
            return await identifiers.delete(
                ctx.request.params.userId,
                ctx.request.params.hash,
            );
        });

    return resource.middleware(prefix);
}
