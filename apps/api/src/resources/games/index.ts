import {
    ClientApi,
    createResource,
} from '@benjambles/mow-server/dist/routing/create-resource.js';
import { getAuthenticatedUserId } from '@benjambles/mow-server/dist/utils/access-checks/get-authenticated-user-id.js';
import { isAdmin } from '@benjambles/mow-server/dist/utils/access-checks/is-admin.js';
import { getObjectId } from '@benjambles/mow-server/dist/utils/db.js';
import {
    created,
    noResponse,
    ok,
} from '@benjambles/mow-server/dist/utils/routes/responses.js';
import createError from 'http-errors';
import { DataModel } from '../../app.js';
import config from './config.js';
import { cleanResponse } from './data/games.js';

export type GameClientTypes = ClientApi<typeof config>;

/**
 * Routes on /games and /games/*
 */
export default function games(dataModel: DataModel) {
    const games = dataModel.getKey('games');

    return createResource(config)
        .operation('createGame', async (ctx) => {
            const { body } = ctx.request;
            const userId = getAuthenticatedUserId(ctx);
            const gameResult = await games.create(body, userId);

            if (!gameResult.ok) {
                throw createError(400, 'There was an error creating the game');
            }

            return created(cleanResponse(gameResult.value));
        })
        .operation('deleteGameById', async (ctx) => {
            const { gameId } = ctx.request.params;
            const userId = getAuthenticatedUserId(ctx);
            const result = await games.delete(gameId, userId);

            if (!result.ok) {
                throw createError(400, 'There was an error whilst deleting the game');
            }

            return noResponse();
        })
        .operation('getGames', async (ctx) => {
            const { limit, offset, userId } = ctx.request.query;

            if (!isAdmin(ctx) && userId !== getAuthenticatedUserId(ctx)) {
                throw createError(403, 'Unable to access another users data');
            }

            const gamesResult = await games.get(userId, limit, offset);
            const gameCount = await games.count({ userId: getObjectId(userId) });

            return ok({ count: gameCount, games: gamesResult.value.map(cleanResponse) });
        })
        .operation('getGameById', async (ctx) => {
            const { gameId } = ctx.request.params;
            const userId = getAuthenticatedUserId(ctx);

            const gamesResult = await games.find(gameId, userId);

            if (!gamesResult.ok) {
                throw createError(404, 'There was an error whilst getting the game data');
            }

            return ok(cleanResponse(gamesResult.value));
        })
        .operation('updateGameById', async (ctx) => {
            const userId = getAuthenticatedUserId(ctx);
            const gameResult = await games.update(
                ctx.request.params.gameId,
                userId,
                ctx.request.body,
            );

            if (!gameResult.ok) {
                throw createError(400, 'There was an error updating the game data');
            }

            return ok(cleanResponse(gameResult.value));
        })
        .get();
}
