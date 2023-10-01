import {
    formatData,
    getDataFormatter,
} from '@benjambles/mow-server/dist/utils/data/index.js';
import { omit } from '@benjambles/mow-server/dist/utils/data/objects.js';
import { ModelResult, getObjectId } from '@benjambles/mow-server/dist/utils/db.js';
import { randomUUID } from 'crypto';
import { Db, ObjectId } from 'mongodb';
import { Env } from '../../schema/env-schema.js';
import { Items } from '../games/data/items.js';
import { UnitResponse } from '../games/data/units.js';

const restrictedKeys = ['deletedOn', 'isDeleted'] as const;

//#region Types
export type Skirmish = {
    _id: ObjectId;
    baseUnits: UnitResponse[];
    characters: {
        _id: string;
        baseUnit: string;
        equipment: Items;
        name: string;
        training: {
            _id: string;
            level: number;
            name: string;
            stats: { name: string; value: number }[];
            traits: string[];
        }[];
    }[];
    createdOn: Date;
    deletedOn?: Date;
    description: string;
    drones: {
        _id: string;
        baseUnit: string;
        equipment: Items;
    }[];
    isDeleted: boolean;
    game: {
        name: string;
        version: string;
    };
    name: string;
    points: number;
    type: string;
    userId: ObjectId;
};

type NewSkirmish = Pick<Skirmish, 'description' | 'game' | 'name' | 'points' | 'type'> &
    Partial<Pick<Skirmish, 'baseUnits' | 'characters' | 'drones'>>;
type UpdateSkirmish = Partial<Omit<Skirmish, RestrictedKeys | ToStringKeys | 'game'>>;
type SkirmishListView = Omit<Skirmish, 'baseUnits' | 'characters' | 'drones'>;

type ToStringKeys = '_id' | 'createdOn' | 'userId';

type RestrictedKeys = (typeof restrictedKeys)[number];

type SkirmishResponse = Omit<Skirmish, RestrictedKeys | ToStringKeys> & {
    [key in ToStringKeys]: string;
};
//#endregion Types

export function getSkirmishModel(db: Db, { ENC_SECRET }: Env) {
    const dataFormatter = formatData(getDataFormatter(ENC_SECRET));
    const items = db.collection<Skirmish>('Skirmishes');

    const model = {
        dataFormatter,
        count: async function (query: Partial<Skirmish>): Promise<number> {
            return await items.countDocuments(query);
        },
        get: async function (
            userId?: string,
            limit: number = 10,
            skip: number = 0,
        ): ModelResult<SkirmishListView[]> {
            const dbResult = await items
                .find(
                    {
                        isDeleted: false,
                        userId: userId ? getObjectId(userId) : undefined,
                    },
                    {
                        limit,
                        skip,
                        projection: { baseUnits: 0, characters: 0, drones: 0 },
                    },
                )
                .toArray();

            return { ok: true, value: dbResult };
        },
        find: async function (uuid: string, userId: string): ModelResult<Skirmish> {
            const dbResult = await items.findOne({
                _id: getObjectId(uuid),
                isDeleted: false,
                userId: getObjectId(userId),
            });

            return {
                ok: !!dbResult,
                value: dbResult,
            };
        },
        create: async function (
            data: NewSkirmish,
            userId: string,
        ): ModelResult<Skirmish> {
            const gameData: Skirmish = {
                _id: getObjectId(randomUUID()),
                baseUnits: data.baseUnits ?? [],
                characters: data.characters ?? [],
                createdOn: new Date(),
                description: data.description,
                drones: data.drones ?? [],
                game: data.game,
                isDeleted: false,
                name: data.name,
                points: data.points,
                type: data.type,
                userId: getObjectId(userId),
            };
            const cleanData = await dataFormatter(gameData);
            const { insertedId } = await items.insertOne(cleanData);

            return await model.find(insertedId.toString(), userId);
        },

        update: async function (
            uuid: string,
            userId: string,
            data: UpdateSkirmish,
        ): ModelResult<Skirmish> {
            const cleanData = await dataFormatter(data);
            const { ok, value } = await items.findOneAndUpdate(
                { _id: getObjectId(uuid), userId: getObjectId(userId) },
                { $set: cleanData },
                { includeResultMetadata: true },
            );

            return { ok: !!ok, value };
        },

        delete: async function (uuid: string, userId: string): ModelResult<number> {
            const { matchedCount, modifiedCount } = await items.updateOne(
                { _id: getObjectId(uuid), userId: getObjectId(userId) },
                {
                    $set: { deletedOn: new Date(), isDeleted: true },
                },
            );

            return {
                ok: !!matchedCount && matchedCount === modifiedCount,
                value: matchedCount,
            };
        },
    };

    return model;
}

export function cleanResponse(data: Skirmish): SkirmishResponse {
    return Object.assign(omit(data, restrictedKeys), {
        _id: data._id.toString(),
        createdOn: data.createdOn.toISOString(),
        userId: data.userId.toString(),
    });
}
