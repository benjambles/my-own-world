import { RouteHandler } from '../../../routing/spec-parsing/get-route-middleware';
import { formatData } from '../../../utils/data/formatData';
import { partsResponse } from '../../../utils/routes/responses';
import { getDataFormatter } from '../../../utils/security/get-data-formatter';
import * as identifiers from './identifiers';

/**
 * Returns all of the identifiers for the requested user
 * @route [Get] /users/:userId/identifiers
 */
export const getUserIdentifiers: RouteHandler = (send) => {
    const defaultError = {
        message: 'There was an error whilst fetching identities for the user.',
        status: 400,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const identityData = await identifiers.getByUserId(
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
export const createUserIdentifier: RouteHandler = (send) => {
    const defaultError = {
        message: 'There was an error whilst adding the identifier to the user.',
        status: 400,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const identifierData = await identifiers.create(
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
export const deleteUserIdentifier: RouteHandler = (send) => {
    const defaultError = {
        message: 'There was an error whilst deleting the users identity.',
        status: 400,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const isDeleted = await identifiers.remove(
                ctx.request.params.userId,
                ctx.request.params.hash,
            );

            return partsResponse(isDeleted);
        });
    };
};
