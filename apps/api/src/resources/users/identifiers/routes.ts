import { formatData, getDataFormatter } from '@benjambles/mow-server/dist/utils/data/index.js';
import { getPartsMiddleware } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import * as identifiers from './identifiers.js';

/**
 * Returns all of the identifiers for the requested user
 * @route [Get] /users/:userId/identifiers
 */
export function getUserIdentifiers(dbInstance) {
    const defaultError = {
        message: 'There was an error whilst fetching identities for the user.',
        status: 400,
    };

    return getPartsMiddleware(defaultError, async (ctx) => {
        const identityData = await identifiers.getByUserId(
            dbInstance,
            ctx.env.ENC_SECRET,
            ctx.request.params.userId,
        );

        return identityData;
    });
}

/**
 * Creates a new identifier for the given user id
 * @route [Post] /users/:userId/identifiers
 */
export function createUserIdentifier(dbInstance) {
    const defaultError = {
        message: 'There was an error whilst adding the identifier to the user.',
        status: 400,
    };

    return getPartsMiddleware(defaultError, async (ctx) => {
        const identifierData = await identifiers.create(
            dbInstance,
            formatData(getDataFormatter(ctx.env.ENC_SECRET, identifiers.model)),
            ctx.env.ENC_SECRET,
            ctx.request.params.userId,
            ctx.request.body,
        );

        return identifierData;
    });
}

/**
 * Deletes an identifier represented by the uuid given
 * @route [Delete] /users/:userId/identifiers/:hash
 */
export function deleteUserIdentifier(dbInstance) {
    const defaultError = {
        message: 'There was an error whilst deleting the users identity.',
        status: 400,
    };

    return getPartsMiddleware(defaultError, async (ctx) => {
        const isDeleted = await identifiers.remove(
            dbInstance,
            ctx.request.params.userId,
            ctx.request.params.hash,
        );

        return isDeleted;
    });
}
