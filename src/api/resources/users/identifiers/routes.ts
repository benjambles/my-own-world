import Koa from 'koa';
import { KoaContext } from '../../../../shared-server/koa/app';
import { formatData } from '../../../utils/data/formatData';
import { generateRoute } from '../../../utils/routes/generate-route';
import { PartsResponse, partsResponse } from '../../../utils/routes/responses';
import { getDataFormatter } from '../../../utils/security/get-data-formatter';
import * as identifiers from './identifiers';

/**
 * Returns all of the identifiers for the requested user
 * @route [Get] /users/:userId/identifiers
 */
export const getUserIdentifiers: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst fetching identities for the user.',
        status: 400,
    },
    async (ctx: KoaContext): Promise<PartsResponse> => {
        const identityData = await identifiers.getByUserId(
            ctx.env.ENC_SECRET,
            ctx.request.params.userId,
        );

        return partsResponse(identityData);
    },
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
    async (ctx: KoaContext): Promise<PartsResponse> => {
        const identifierData = await identifiers.create(
            formatData(getDataFormatter(ctx.env.ENC_SECRET, identifiers.model)),
            ctx.env.ENC_SECRET,
            ctx.request.params.userId,
            ctx.request.body,
        );

        return partsResponse(identifierData);
    },
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
    async (ctx: KoaContext): Promise<PartsResponse> => {
        const isDeleted = await identifiers.remove(
            ctx.request.params.userId,
            ctx.request.params.hash,
        );

        return partsResponse(isDeleted);
    },
);
