import { paramToNumber } from '@benjambles/mow-server/dist/utils/data/param-to-number.js';
import { getPartsMiddleware } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { hmac } from '@benjambles/mow-server/dist/utils/security/encryption.js';
import { getToken } from '@benjambles/mow-server/dist/utils/security/jwt.js';
import { DataModel } from '../../app.js';
import { NewUser, UserResponse } from './users.js';

export default function getUserRoutes(dataModel: DataModel) {
    const users = dataModel.get('users');
    const identifiers = dataModel.get('identifiers');

    return {
        /**
         * Get users, optionally filtered by parameters
         * @route [GET] /users
         */
        getUsers: getPartsMiddleware(
            'There was an error whilst fetching users.',
            async (ctx) => {
                const { limit, offset } = ctx.request.query;
                const usersData: UserResponse[] = await users.get(
                    paramToNumber(limit, 10),
                    paramToNumber(offset, 0),
                );

                return usersData;
            },
        ),

        /**
         * Create a new user
         * @route [POST] /users
         */
        createUser: getPartsMiddleware(
            'There was an error whilst saving the user',
            async (ctx) => {
                const { user, identifier } = ctx.request.body;
                const userData: UserResponse = await users.create(user);
                await identifiers.create(
                    ctx.env.ENC_SECRET,
                    userData._id.toString(),
                    identifier,
                );

                return userData;
            },
        ),

        /**
         * Get a user and return it's data object
         * @route [GET] /users/:userId
         */
        getUserById: getPartsMiddleware(
            'There was an error whilst fetching the user.',
            async (ctx) => {
                return await users.find(ctx.request.params.userId);
            },
        ),
        /**
         * Update a user and return the updated data
         * @route [PUT] /users/:userId
         */
        updateUserById: getPartsMiddleware(
            'There was an error whilst updating the user.',
            async (ctx) => {
                return await users.update(
                    ctx.request.params.userId,
                    ctx.request.body as NewUser,
                );
            },
        ),

        /**
         * Mark a user as deleted
         * @route [DELETE] /users/:userId
         */
        deleteUserById: getPartsMiddleware(
            'There was an error whilst deleting the user.',
            async (ctx) => {
                return await users.delete(ctx.request.params.userId);
            },
        ),

        /**
         * fetch related user and if found test their password
         * @route [POST] /users/authentication
         */
        authenticateUser: getPartsMiddleware(
            'There was an error whilst authenticating the user.',
            async (ctx) => {
                const { identifier = null, password = null } = ctx.request.body as any;
                const hashedIdentifier = hmac(ctx.env.ENC_SECRET, identifier);
                const userData = await users.authenticate(hashedIdentifier, password);
                const token = await getToken(ctx.env.JWT_SECRET, userData);

                return { token, user: userData };
            },
        ),

        /**
         * Requests a magic link for user access be sent to the identifier provided
         * @route [Post] /users/access
         */
        getAccessLink: getPartsMiddleware(
            'There was an error whilst requesting the access link',
            async () => {
                //const { email } = ctx.request.body as any;
                await users.sendMagicLink();

                return {
                    message: 'Magic link sent! Please check the email address provided.',
                };
            },
        ),
    };
}
