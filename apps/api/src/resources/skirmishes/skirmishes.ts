import {
    formatData,
    getDataFormatter,
} from '@benjambles/mow-server/dist/utils/data/index.js';
import { omit } from '@benjambles/mow-server/dist/utils/data/objects.js';
import { ModelResult, getObjectId } from '@benjambles/mow-server/dist/utils/db.js';
import { randomUUID } from 'crypto';
import { Db, ObjectId } from 'mongodb';
import { Env } from '../../schema/env-schema.js';

const restrictedKeys = ['deletedOn', 'isDeleted'] as const;

//#region Types
export type Skirmish = {
    _id: ObjectId;
    createdOn: Date;
    deletedOn?: Date;
    description: string;
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

type NewSkirmish = Pick<Skirmish, 'description' | 'game' | 'name' | 'points' | 'type'>;

type UpdateSkirmish = Pick<Skirmish, 'description' | 'name' | 'points'>;

type ToStringKeys = '_id' | 'createdOn' | 'userId';

type RestrictedKeys = (typeof restrictedKeys)[number];

type SkirmishResponse = Omit<Skirmish, RestrictedKeys | ToStringKeys> & {
    [key in ToStringKeys]: string;
};
//#endregion Types

export function getSkirmishModel(db: Db, { ENC_SECRET }: Env) {
    const dataFormatter = formatData(getDataFormatter(ENC_SECRET));
    const items = db.collection<Skirmish>('Skirmishs');

    const model = {
        dataFormatter,
        count: async function (query: Partial<Skirmish>): Promise<number> {
            return await items.countDocuments(query);
        },
        get: async function (
            userId?: string,
            limit: number = 10,
            skip: number = 0,
        ): ModelResult<Skirmish[]> {
            const dbResult = await items
                .find(
                    {
                        isDeleted: false,
                        userId: userId ? getObjectId(userId) : undefined,
                    },
                    { limit, skip },
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
                createdOn: new Date(),
                description: data.description,
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
            data: Partial<UpdateSkirmish>,
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
