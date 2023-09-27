import { ModelResult, getObjectId } from '@benjambles/mow-server/dist/utils/db.js';
import { randomUUID } from 'crypto';
import { Db } from 'mongodb';
import { Game, getGamesCollection } from './games.js';

//#region Types
export type Unit = Game['units'][number];

type NewUnit = Omit<Unit, '_id'>;
type UpdateUnit = Partial<NewUnit>;

type ToStringKeys = '_id';
type UnitResponse = Omit<Unit, ToStringKeys> & {
    [key in ToStringKeys]: string;
};
//#endregion Types

export function getUnitModel(db: Db) {
    const games = getGamesCollection(db);

    const model = {
        create: async function (gameId: string, data: NewUnit): ModelResult<Unit> {
            const unitData: Unit = {
                ...data,
                _id: getObjectId(randomUUID()),
            };
            const { ok, value } = await games.findOneAndUpdate(
                { _id: getObjectId(gameId) },
                {
                    $push: {
                        units: unitData,
                    },
                },
                {
                    includeResultMetadata: true,
                    projection: { units: { $slice: -1 } },
                },
            );

            return { ok: !!ok, value: value?.units[0] };
        },
        delete: async function (unitId: string, gameId: string) {
            const dbResult = await games.findOneAndUpdate(
                { _id: getObjectId(gameId) },
                { $pull: { units: { _id: getObjectId(unitId) } } },
                { projection: { units: 1 } },
            );

            return { ok: !!dbResult, value: dbResult?.units };
        },
        get: async function (gameId: string): ModelResult<Unit[]> {
            const dbResult = await games.findOne(
                { _id: getObjectId(gameId) },
                { projection: { units: 1 } },
            );

            return {
                ok: !!dbResult,
                value: dbResult?.units,
            };
        },
        update: async function (
            uuid: string,
            gameId: string,
            data: Partial<UpdateUnit>,
        ): ModelResult<Unit> {
            const { ok, value } = await games.findOneAndUpdate(
                {
                    _id: getObjectId(gameId),
                    'units._id': uuid,
                },
                {
                    $set: {
                        'units.$': data,
                    },
                },
                {
                    includeResultMetadata: true,
                    projection: { units: { $slice: -1 } },
                },
            );

            return { ok: !!ok, value: value?.units[0] };
        },
    };

    return model;
}

export function cleanResponse(data: Unit): UnitResponse {
    return Object.assign(data, {
        _id: data._id.toString(),
    });
}
