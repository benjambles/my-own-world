import { getPartsMiddleware } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { DataModel } from '../../../app.js';

export default function getUserRoutes(dataModel: DataModel) {
    const identifiers = dataModel.get('identifiers');

    return {
        /**
         * Returns all of the identifiers for the requested user
         * @route [Get] /users/:userId/identifiers
         */
        getUserIdentifiers: getPartsMiddleware(
            'There was an error whilst fetching identities for the user.',
            async (ctx) => {
                return await identifiers.find(
                    ctx.env.ENC_SECRET,
                    ctx.request.params.userId,
                );
            },
        ),
        /**
         * Creates a new identifier for the given user id
         * @route [Post] /users/:userId/identifiers
         */
        createUserIdentifier: getPartsMiddleware(
            'There was an error whilst adding the identifier to the user.',
            async (ctx) => {
                return await identifiers.create(
                    ctx.env.ENC_SECRET,
                    ctx.request.params.userId,
                    ctx.request.body,
                );
            },
        ),
        /**
         * Deletes an identifier represented by the uuid given
         * @route [Delete] /users/:userId/identifiers/:hash
         */
        deleteUserIdentifier: getPartsMiddleware(
            'There was an error whilst deleting the users identity.',
            async (ctx) => {
                return await identifiers.delete(
                    ctx.request.params.userId,
                    ctx.request.params.hash,
                );
            },
        ),
    };
}
