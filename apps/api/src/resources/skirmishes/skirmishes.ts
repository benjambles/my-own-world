import {
    formatData,
    getDataFormatter,
} from '@benjambles/mow-server/dist/utils/data/index.js';
import { omit } from '@benjambles/mow-server/dist/utils/data/objects.js';
import { ModelResult, getObjectId } from '@benjambles/mow-server/dist/utils/db.js';
import { Db, ObjectId } from 'mongodb';
import { Env } from '../../schema/env-schema.js';
import { ArchetypeResponse } from '../games/data/archetypes.js';
import { Items } from '../games/data/items.js';

const restrictedKeys = ['deletedOn', 'isDeleted'] as const;

//#region Types
export type Skirmish = {
    _id: ObjectId;
    archetypes: ArchetypeResponse[];
    characters: {
        _id: string;
        archetypeId: string;
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
        archetypeId: string;
        equipment: Items;
    }[];
    isDeleted: boolean;
    game: {
        _id: string;
        name: string;
        version: string;
    };
    name: string;
    points: number;
    type: string;
    updatedOn: Date;
    userId: ObjectId;
};

type NewSkirmish = Pick<Skirmish, 'description' | 'game' | 'name' | 'points' | 'type'> &
    Partial<Pick<Skirmish, 'archetypes' | 'characters' | 'drones'>>;
type UpdateSkirmish = Partial<Omit<Skirmish, RestrictedKeys | ToStringKeys | 'game'>>;

type ToStringKeys = '_id' | 'createdOn' | 'userId' | 'updatedOn';

type RestrictedKeys = (typeof restrictedKeys)[number];

export type SkirmishResponse = Omit<Skirmish, RestrictedKeys | ToStringKeys> & {
    [key in ToStringKeys]: string;
};
export type SkirmishListView = Omit<
    SkirmishResponse,
    'archetypes' | 'characters' | 'drones'
>;
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
        ): ModelResult<Skirmish[]> {
            const dbResult = await items
                .find(
                    {
                        isDeleted: false,
                        userId: userId ? getObjectId(userId) : undefined,
                    },
                    {
                        limit,
                        skip,
                        projection: { archetypes: 0, characters: 0, drones: 0 },
                        sort: { createdOn: -1 },
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
            const now = new Date();
            const gameData: Skirmish = {
                _id: getObjectId(),
                archetypes: data.archetypes ?? [],
                characters: data.characters ?? [],
                createdOn: now,
                description: data.description,
                drones: data.drones ?? [],
                game: data.game,
                isDeleted: false,
                name: data.name,
                points: data.points,
                type: data.type,
                updatedOn: now,
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
                { $set: Object.assign(cleanData, { updatedOn: new Date() }) },
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
        updatedOn: data.updatedOn.toISOString(),
        userId: data.userId.toString(),
    });
}
