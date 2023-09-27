import {
    ClientApi,
    createResource,
} from '@benjambles/mow-server/dist/routing/create-resource.js';
import {
    created,
    noResponse,
    ok,
} from '@benjambles/mow-server/dist/utils/routes/responses.js';
import createError from 'http-errors';
import { DataModel } from '../../app.js';
import config from './config.js';
import { cleanResponse } from './data/games.js';
import { cleanResponse as cleanUnitResponse } from './data/units.js';

export type GameClientTypes = ClientApi<typeof config>;

/**
 * Routes on /games and /games/*
 */
export default function games(dataModel: DataModel) {
    const games = dataModel.getKey('games');
    const units = dataModel.getKey('units');

    return createResource(config)
        .operation('createGame', async (ctx) => {
            const { body } = ctx.request;
            const gameResult = await games.create(body);

            if (!gameResult.ok) {
                throw createError(400, 'There was an error creating the game');
            }

            return created(cleanResponse(gameResult.value));
        })
        .operation('getGames', async (ctx) => {
            const { limit, offset } = ctx.request.query;

            const gamesResult = await games.get(limit, offset);
            const gameCount = await games.count();

            return ok({
                count: gameCount,
                games: gamesResult.value.map(cleanResponse),
            });
        })
        .operation('getGameById', async (ctx) => {
            const { gameId } = ctx.request.params;

            const gamesResult = await games.find(gameId);

            if (!gamesResult.ok) {
                throw createError(404, 'There was an error whilst getting the game data');
            }

            return ok(cleanResponse(gamesResult.value));
        })
        .operation('updateGameById', async (ctx) => {
            const gameResult = await games.update(
                ctx.request.params.gameId,
                ctx.request.body,
            );

            if (!gameResult.ok) {
                throw createError(400, 'There was an error updating the game data');
            }

            return ok(cleanResponse(gameResult.value));
        })
        .operation('getUnits', async (ctx) => {
            const { gameId } = ctx.request.params;
            const result = await units.get(gameId);

            if (!result.ok) {
                throw createError(400, 'There was an error whilst deleting the unit');
            }

            return ok(result.value.map(cleanUnitResponse));
        })
        .operation('createUnit', async (ctx) => {
            const {
                body,
                params: { gameId },
            } = ctx.request;
            const gameResult = await units.create(gameId, body);

            if (!gameResult.ok) {
                throw createError(400, 'There was an error creating the game');
            }

            return created(cleanUnitResponse(gameResult.value));
        })
        .operation('deleteUnitById', async (ctx) => {
            const { gameId, unitId } = ctx.request.params;
            const result = await units.delete(unitId, gameId);

            if (!result.ok) {
                throw createError(400, 'There was an error whilst deleting the unit');
            }

            return noResponse();
        })
        .operation('updateUnitById', async (ctx) => {
            const {
                body,
                params: { gameId, unitId },
            } = ctx.request;
            const result = await units.update(unitId, gameId, body);

            if (!result.ok) {
                throw createError(400, 'There was an error updating the game data');
            }

            return ok(cleanUnitResponse(result.value));
        })
        .get();
}
