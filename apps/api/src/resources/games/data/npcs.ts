import { DeepPartial } from '@benjambles/js-lib/dist/index.js';
import { omit } from '@benjambles/mow-server/dist/utils/data/objects.js';
import { ModelResult, getObjectId } from '@benjambles/mow-server/dist/utils/db.js';
import { randomUUID } from 'crypto';
import { Db, ObjectId } from 'mongodb';
import { ArchetypeResponse } from './archetypes.js';
import { getGamesCollection } from './games.js';
import { Items } from './items.js';

const restrictedKeys = ['deletedOn', 'isDeleted'] as const;

//#region Types
export type Npc = {
    _id: ObjectId;
    archetype: ArchetypeResponse;
    deletedOn: Date;
    description: string;
    equipment: Items;
    gameId: string;
    isDeleted: boolean;
    isUnique: boolean;
    name: string;
    summary: string;
    training: {
        _id: string;
        level: number;
        name: string;
        stats: { name: string; value: number }[];
        traits: string[];
    }[];
};

export type NewNpc = Omit<Npc, '_id' | 'isDeleted' | 'deletedOn'>;

type ToStringKeys = '_id';

type RestrictedKeys = (typeof restrictedKeys)[number];

type NpcResponse = Omit<Npc, RestrictedKeys | ToStringKeys> & {
    [key in ToStringKeys]: string;
};
//#endregion Types

export function getNpcModel(db: Db) {
    const games = getGamesCollection(db);

    const model = {
        get: async function (
            gameId: string,
            limit: number,
            skip: number = 0,
        ): ModelResult<{ count: number; items: Npc[] }> {
            const dbResult = await games.findOne(
                { _id: getObjectId(gameId), isDeleted: false },
                { projection: { npcs: 1 } },
            );

            return {
                ok: !!dbResult,
                value: {
                    count: dbResult?.npcs.length,
                    items: limit
                        ? dbResult?.npcs.slice(skip, skip + limit)
                        : dbResult?.npcs ?? [],
                },
            };
        },

        find: async function (gameId: string, uuid: string): ModelResult<Npc> {
            const dbResult = await games.findOne(
                {
                    _id: getObjectId(gameId),
                    isDeleted: false,
                    'npcs.id': getObjectId(uuid),
                },
                { projection: { npcs: 1 } },
            );

            return {
                ok: !!dbResult,
                value: dbResult?.npcs[0],
            };
        },

        create: async function (gameId: string, data: any): ModelResult<Npc> {
            data._id = getObjectId(randomUUID());
            data.isDeleted = false;

            const { ok, value } = await games.findOneAndUpdate(
                { _id: getObjectId(gameId) },
                { $push: { npcs: data } },
                { includeResultMetadata: true, projection: { $slice: -1 } },
            );

            return { ok: !!ok, value: value?.npcs[0] };
        },

        update: async function (
            gameId: string,
            uuid: string,
            data: DeepPartial<Npc>,
        ): ModelResult<Npc> {
            const { ok, value } = await games.findOneAndUpdate(
                { _id: getObjectId(gameId), 'npcs.id': getObjectId(uuid) },
                { set: { 'npcs.$.id': data } },
                { includeResultMetadata: true, projection: { $slice: -1 } },
            );

            return { ok: !!ok, value: value?.npcs[0] };
        },

        delete: async function (gameId: string, uuid: string): Promise<{ ok: boolean }> {
            const { ok } = await games.findOneAndUpdate(
                { _id: getObjectId(gameId) },
                { $pull: { npcs: { _id: getObjectId(uuid) } } },
                { includeResultMetadata: true, projection: { npcs: 1 } },
            );

            return { ok: !!ok };
        },
    };

    return model;
}

export function cleanNpcResponse(data: Npc): NpcResponse {
    return Object.assign(omit(data, restrictedKeys), { _id: data._id.toString() });
}
