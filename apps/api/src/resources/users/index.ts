import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import { isCurrentUser } from '@benjambles/mow-server/dist/utils/access-checks/get-authenticated-user-id.js';
import { hmac } from '@benjambles/mow-server/dist/utils/security/encryption.js';
import { getToken } from '@benjambles/mow-server/dist/utils/security/jwt.js';
import {
    created,
    noResponse,
    ok,
} from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { DataModel } from '../../app.js';
import config from './config.js';

/**
 * Routes on /users and /users/*
 * Special auth routes under: /authentication
 */
export default function users(dataModel: DataModel, prefix: string) {
    const users = dataModel.get('users');
    const identifiers = dataModel.get('identifiers');

    return createResource(config, prefix)
        .access('role:owner', isCurrentUser)
        .operation('authenticateUser', async (ctx) => {
            const { identifier, password } = ctx.request.body;
            const hashedIdentifier = hmac(ctx.env.ENC_SECRET, identifier);
            const userData = await users.authenticate(hashedIdentifier, password);
            const token = await getToken(ctx.env.JWT_SECRET, userData);

            return ok({ token, user: userData });
        })
        .operation('getUsers', async (ctx) => {
            const { limit, offset } = ctx.request.query;
            const data = await users.get(limit, offset);

            return ok(data);
        })
        .operation('getUserById', async (ctx) => {
            const data = await users.find(ctx.request.params.userId);

            return ok(data);
        })
        .operation('deleteUserById', async (ctx) => {
            await users.delete(ctx.request.params.userId);

            return noResponse();
        })
        .operation('createUser', async (ctx) => {
            const { user, identifier } = ctx.request.body;
            const userData = await users.create(user);
            await identifiers.create(userData._id.toString(), identifier);

            return created(userData);
        })
        .operation('updateUserById', async (ctx) => {
            const data = await users.update(ctx.request.params.userId, ctx.request.body);

            return ok(data);
        })
        .operation('getUserIdentifiers', async (ctx) => {
            const data = await identifiers.find(
                ctx.env.ENC_SECRET,
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
        .get();
}
