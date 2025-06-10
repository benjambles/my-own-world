import {
    ClientApi,
    createResource,
} from '@benjambles/mow-server/dist/routing/create-resource.js';
import {
    created,
    noContent,
    ok,
} from '@benjambles/mow-server/dist/utils/routes/responses.js';
import createError from 'http-errors';
import { DataModel } from '../../app.js';
import config from './config.js';
import { cleanArchetypeResponse } from './data/archetypes.js';
import { cleanGameResponse } from './data/games.js';
import { cleanNpcResponse } from './data/npcs.js';
import { cleanMissionResponse } from './data/missions.js';

export type GameClientTypes = ClientApi<typeof config>;

/**
 * Routes on /games and /games/*
 */
export default function games(dataModel: DataModel) {
    const games = dataModel.getKey('games');
    const archetypes = dataModel.getKey('archetypes');
    const items = dataModel.getKey('items');
    const npcs = dataModel.getKey('npcs');
    const missions = dataModel.getKey('missions');

    return createResource(config)
        .operation('createGame', async (ctx) => {
            const { body } = ctx.request;
            const gameResult = await games.create(body);

            if (!gameResult.ok) {
                throw createError(400, 'There was an error creating the game');
            }

            return created(cleanGameResponse(gameResult.value));
        })
        .operation('getGames', async (ctx) => {
            const { limit, offset, gameName } = ctx.request.query;

            const gamesResult = await games.get(gameName, limit, offset);
            const gameCount = await games.count();

            return ok({
                count: gameCount,
                items: gamesResult.value.map(cleanGameResponse),
            });
        })
        .operation('getGameById', async (ctx) => {
            const { gameId } = ctx.request.params;

            const gamesResult = await games.find(gameId);

            if (!gamesResult.ok) {
                throw createError(404, 'There was an error whilst getting the game data');
            }

            return ok(cleanGameResponse(gamesResult.value));
        })
        .operation('updateGameById', async (ctx) => {
            const gameResult = await games.update(
                ctx.request.params.gameId,
                ctx.request.body,
            );

            if (!gameResult.ok) {
                throw createError(400, 'There was an error updating the game data');
            }

            return ok(cleanGameResponse(gameResult.value));
        })
        .operation('getArchetypes', async (ctx) => {
            const {
                params: { gameId },
                query: { limit, offset },
            } = ctx.request;
            const result = await archetypes.get(gameId, limit, offset);

            if (!result.ok) {
                throw createError(
                    400,
                    'There was an error whilst deleting the archetype',
                );
            }

            return ok({
                count: result.value.count,
                items: result.value.items.map(cleanArchetypeResponse),
            });
        })
        .operation('createArchetype', async (ctx) => {
            const {
                body,
                params: { gameId },
            } = ctx.request;
            const gameResult = await archetypes.create(gameId, body);

            if (!gameResult.ok) {
                throw createError(400, 'There was an error creating the game');
            }

            return created(cleanArchetypeResponse(gameResult.value));
        })
        .operation('deleteArchetypeById', async (ctx) => {
            const { gameId, archetypeId } = ctx.request.params;
            const result = await archetypes.delete(archetypeId, gameId);

            if (!result.ok) {
                throw createError(
                    400,
                    'There was an error whilst deleting the archetype',
                );
            }

            return noContent();
        })
        .operation('updateArchetypeById', async (ctx) => {
            const {
                body,
                params: { gameId, archetypeId },
            } = ctx.request;
            const result = await archetypes.update(archetypeId, gameId, body);

            if (!result.ok) {
                throw createError(400, 'There was an error updating the game data');
            }

            return ok(cleanArchetypeResponse(result.value));
        })
        .operation('deleteItems', async (ctx) => {
            const {
                body,
                params: { gameId },
            } = ctx.request;

            const result = await items.delete(gameId, body);

            if (!result.ok) {
                throw createError(400, 'There was an error deleting the items requested');
            }

            return noContent();
        })
        .operation('getItems', async (ctx) => {
            const {
                params: { gameId },
            } = ctx.request;

            const result = await items.get(gameId);

            if (!result.ok) {
                throw createError(400, 'There was an error detching the items');
            }

            return ok(result.value);
        })
        .operation('updateItems', async (ctx) => {
            const {
                body,
                params: { gameId },
            } = ctx.request;

            const result = await items.update(gameId, body);

            if (!result.ok) {
                throw createError(400, 'There was an error deleting the items requested');
            }

            return ok(result.value);
        })
        .operation('createNpc', async (ctx) => {
            const {
                body,
                params: { gameId },
            } = ctx.request;

            const result = await npcs.create(gameId, body);
            if (!result.ok) {
                throw createError(400, 'There was an error creating the NPC');
            }

            return created(cleanNpcResponse(result.value));
        })
        .operation('deleteNpcById', async (ctx) => {
            const { gameId, npcId } = ctx.request.params;

            const result = await npcs.delete(gameId, npcId);

            if (!result.ok) {
                throw createError(400, 'There was an error deleteing the NPC');
            }

            return noContent();
        })
        .operation('getNpcById', async (ctx) => {
            const { gameId, npcId } = ctx.request.params;

            const result = await npcs.find(gameId, npcId);

            if (!result.ok) {
                throw createError(400, 'There was an error deleteing the NPC');
            }

            return ok(cleanNpcResponse(result.value));
        })
        .operation('getNpcs', async (ctx) => {
            const {
                params: { gameId },
                query: { limit, offset },
            } = ctx.request;

            const result = await npcs.get(gameId, limit, offset);

            if (!result.ok) {
                throw createError(400, 'There was an error fetching NPCs');
            }

            return ok({
                count: result.value.count,
                items: result.value.items.map(cleanNpcResponse),
            });
        })
        .operation('updateNpcById', async (ctx) => {
            const {
                body,
                params: { gameId, npcId },
            } = ctx.request;

            const result = await npcs.update(gameId, npcId, body);

            if (!result.ok) {
                throw createError(400, 'There was an error updating the NPC');
            }

            return ok(cleanNpcResponse(result.value));
        })
        .operation('getGameMissions', async (ctx) => {
            const {
                params: { gameId },
                query: { limit, offset },
            } = ctx.request;

            const result = await missions.get(gameId, limit, offset);

            if (!result.ok) {
                throw createError(400, 'There was an error fetching Missions');
            }

            return ok({
                count: result.value.count,
                items: result.value.items.map(cleanMissionResponse),
            });
        })
        .operation('createMission', async (ctx) => {
            const {
                params: { gameId },
                body,
            } = ctx.request;

            const result = await missions.create(gameId, body);

            if (!result.ok) {
                throw createError(400, 'There was an error whilst creating the mission');
            }

            return created(cleanMissionResponse(result.value));
        })
        .get();
}
