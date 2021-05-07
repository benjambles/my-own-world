import { RouteHandler } from '../../../routing/spec-parsing/get-route-middleware.js';
import { formatData } from '../../../utils/data/formatData.js';
import { partsResponse } from '../../../utils/routes/responses.js';
import { getDataFormatter } from '../../../utils/security/get-data-formatter.js';
import * as identifiers from './identifiers.js';

/**
 * Returns all of the identifiers for the requested user
 * @route [Get] /users/:userId/identifiers
 */
export const getUserIdentifiers: RouteHandler = (send, dbInstance) => {
    const defaultError = {
        message: 'There was an error whilst fetching identities for the user.',
        status: 400,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const identityData = await identifiers.getByUserId(
                dbInstance,
                ctx.env.ENC_SECRET,
                ctx.request.params.userId,
            );

            return partsResponse(identityData);
        });
    };
};

/**
 * Creates a new identifier for the given user id
 * @route [Post] /users/:userId/identifiers
 */
export const createUserIdentifier: RouteHandler = (send, dbInstance) => {
    const defaultError = {
        message: 'There was an error whilst adding the identifier to the user.',
        status: 400,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const identifierData = await identifiers.create(
                dbInstance,
                formatData(getDataFormatter(ctx.env.ENC_SECRET, identifiers.model)),
                ctx.env.ENC_SECRET,
                ctx.request.params.userId,
                ctx.request.body,
            );

            return partsResponse(identifierData);
        });
    };
};

/**
 * Deletes an identifier represented by the uuid given
 * @route [Delete] /users/:userId/identifiers/:hash
 */
export const deleteUserIdentifier: RouteHandler = (send, dbInstance) => {
    const defaultError = {
        message: 'There was an error whilst deleting the users identity.',
        status: 400,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const isDeleted = await identifiers.remove(
                dbInstance,
                ctx.request.params.userId,
                ctx.request.params.hash,
            );

            return partsResponse(isDeleted);
        });
    };
};
