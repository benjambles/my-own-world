import * as Koa from 'koa';

import { generateRoute } from '../../../utils/routes';
import * as identifiers from './identifiers';

//--- /users/:userId/identifiers ---//

/**
 * Returns all of the identifiers for the requested user
 * @route [Get] /users/:userId/identifiers
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 * @returns {Promise<void>}
 */
export const getUserIdentifiers: Function = generateRoute(
    {
        message: 'There was an error whilst fetching identities for the user.',
        status: 400
    },
    async function(ctx) {
        const { limit = 10, offset = 0 }: dbGet = ctx.request.query;
        const identityData = await identifiers.getByUserId(
            ctx.request.params.userId,
            limit,
            offset
        );

        return { parts: [identityData] };
    }
);

/**
 * Creates a new identifier for the given user id
 * @route [Post] /users/:userId/identifiers
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 * @returns {Promise<void>}
 */
export const createUserIdentifier: Function = generateRoute(
    {
        message: 'There was an error whilst adding the identifier to the user.',
        status: 400
    },
    async function(ctx) {
        const identifierData = await identifiers.create(
            ctx.request.params.userId,
            ctx.request.body
        );
        return { parts: [identifierData] };
    }
);

//--- /users/:userId/identifiers/:identifierId --/

/**
 * Deletes an identifier represented by the uuid given
 * @route [Delete] /users/:userId/identifiers/:identifierId
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 * @returns {Promise<void>}
 */
export const deleteUserIdentifier: Function = generateRoute(
    {
        message: 'There was an error whilst deleting the users identity.',
        status: 400
    },
    async function(ctx) {
        const isDeleted = await identifiers.remove(ctx.request.params.identifierId);
        return { parts: [isDeleted] };
    }
);
