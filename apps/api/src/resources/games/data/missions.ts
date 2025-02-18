import { DeepPartial } from '@benjambles/js-lib/dist/index.js';
import { omit } from '@benjambles/mow-server/dist/utils/data/objects.js';
import { getObjectId, ModelResult } from '@benjambles/mow-server/dist/utils/db.js';
import { Db, ObjectId } from 'mongodb';
import { getGamesCollection } from './games.js';

const restrictedKeys = ['deletedOn', 'isDeleted'] as const;

//#region Types
export interface Mission {
    _id: ObjectId;
    deletedOn: Date;
    description: string;
    isDeleted: boolean;
    mapImage: string;
}

export type NewMission = Omit<Mission, '_id' | RestrictedKeys>;

type ToStringKeys = '_id';

type RestrictedKeys = (typeof restrictedKeys)[number];

type MissionResponse = Omit<Mission, RestrictedKeys | ToStringKeys> & {
    [key in ToStringKeys]: string;
};
//#endregion Types

export function getMissionModel(db: Db) {
    const games = getGamesCollection(db);

    const model = {
        get: async function (
            gameId: string,
            limit: number,
            skip: number = 0,
        ): ModelResult<{ count: number; items: Mission[] }> {
            const dbResult = await games.findOne(
                { _id: getObjectId(gameId), isDeleted: false },
                { projection: { missions: 1 } },
            );

            return {
                ok: !!dbResult,
                value: {
                    count: dbResult?.missions.length,
                    items: limit
                        ? dbResult?.missions.slice(skip, skip + limit)
                        : dbResult?.missions ?? [],
                },
            };
        },

        find: async function (gameId: string, uuid: string): ModelResult<Mission> {
            const dbResult = await games.findOne(
                {
                    _id: getObjectId(gameId),
                    isDeleted: false,
                    'missions.id': getObjectId(uuid),
                },
                { projection: { missions: 1 } },
            );

            return {
                ok: !!dbResult,
                value: dbResult?.missions[0],
            };
        },

        create: async function (gameId: string, data: NewMission): ModelResult<Mission> {
            const { ok, value } = await games.findOneAndUpdate(
                { _id: getObjectId(gameId) },
                {
                    $push: {
                        missions: {
                            ...data,
                            _id: getObjectId(),
                            isDeleted: false,
                            deletedOn: undefined,
                        },
                    },
                },
                { includeResultMetadata: true, projection: { $slice: -1 } },
            );

            return { ok: !!ok, value: value?.missions[0] };
        },

        update: async function (
            gameId: string,
            uuid: string,
            data: DeepPartial<NewMission>,
        ): ModelResult<Mission> {
            const { ok, value } = await games.findOneAndUpdate(
                { _id: getObjectId(gameId), 'missions.id': getObjectId(uuid) },
                { set: { 'missions.$.id': data } },
                { includeResultMetadata: true, projection: { $slice: -1 } },
            );

            return { ok: !!ok, value: value?.missions[0] };
        },

        delete: async function (gameId: string, uuid: string): Promise<{ ok: boolean }> {
            const { ok } = await games.findOneAndUpdate(
                { _id: getObjectId(gameId) },
                {
                    $pull: {
                        missions: {
                            _id: getObjectId(uuid),
                            isDeleted: true,
                            deletedOn: new Date(),
                        },
                    },
                },
                { includeResultMetadata: true, projection: { missions: 1 } },
            );

            return { ok: !!ok };
        },
    };

    return model;
}

export function cleanMissionResponse(data: Mission): MissionResponse {
    return Object.assign(omit(data, restrictedKeys), { _id: data._id.toString() });
}
