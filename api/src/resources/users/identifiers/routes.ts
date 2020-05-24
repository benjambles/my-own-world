import * as Koa from 'koa';

import { generateRoute } from '../../../utils/routes/generate-route';
import * as identifiers from './identifiers';
import { partsResponse } from '../../../utils/routes/responses';

/**
 * Returns all of the identifiers for the requested user
 * @route [Get] /users/:userId/identifiers
 */
export const getUserIdentifiers: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst fetching identities for the user.',
        status: 400,
    },
    async (ctx: Koa.Context): Promise<ApiResponse> => {
        const identityData = await identifiers.getByUserId(ctx.request.params.userId);

        return partsResponse(identityData);
    }
);

/**
 * Creates a new identifier for the given user id
 * @route [Post] /users/:userId/identifiers
 */
export const createUserIdentifier: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst adding the identifier to the user.',
        status: 400,
    },
    async (ctx: Koa.Context): Promise<ApiResponse> => {
        const identifierData = await identifiers.create(
            ctx.request.params.userId,
            ctx.request.body
        );

        return partsResponse(identifierData);
    }
);

/**
 * Deletes an identifier represented by the uuid given
 * @route [Delete] /users/:userId/identifiers/:hash
 */
export const deleteUserIdentifier: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst deleting the users identity.',
        status: 400,
    },
    async (ctx: Koa.Context): Promise<ApiResponse> => {
        const isDeleted = await identifiers.remove(
            ctx.request.params.userId,
            ctx.request.params.hash
        );

        return partsResponse(isDeleted);
    }
);