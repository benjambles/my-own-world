import { DeepPartial } from '@benjambles/js-lib/dist/index.js';
import {
    formatData,
    getDataFormatter,
    ModelOptions,
} from '@benjambles/mow-server/dist/utils/data/index.js';
import { omit } from '@benjambles/mow-server/dist/utils/data/objects.js';
import { getObjectId, ModelResult } from '@benjambles/mow-server/dist/utils/db.js';
import { Consumable } from '@benjambles/skirmish-engine/dist/item/consumables/consumables.js';
import { randomUUID } from 'crypto';
import { Db, ObjectId } from 'mongodb';
import { Env } from '../../../schema/env-schema.js';

const restrictedKeys = ['isDeleted'] as const;

//#region Types
export interface GameConsumable extends Consumable {
    _id: ObjectId;
    isDeleted: boolean;
}

export type NewConsumable = Omit<GameConsumable, '_id' | 'isDeleted'>;

type ToStringKeys = '_id';

type RestrictedKeys = (typeof restrictedKeys)[number];

type ConsumableResponse = Omit<GameConsumable, RestrictedKeys | ToStringKeys> & {
    [key in ToStringKeys]: string;
};
//#endregion Types

export function getConsumableModel(db: Db, { ENC_SECRET }: Env) {
    const formatOptions: ModelOptions = {
        encrypted: [],
        salted: [],
        readOnly: ['_id'],
        hmac: [],
    };

    const dataFormatter = formatData(getDataFormatter(ENC_SECRET, formatOptions));
    const items = db.collection<GameConsumable>('Consumables');

    const model = {
        dataFormatter,
        get: async function (
            limit: number = 10,
            skip: number = 0,
        ): ModelResult<GameConsumable[]> {
            const dbResult = await items
                .find({ isDeleted: false }, { projection: {}, skip, limit })
                .toArray();

            return { ok: true, value: dbResult };
        },

        find: async function (uuid: string): ModelResult<GameConsumable> {
            const dbResult = await items.findOne(
                { _id: getObjectId(uuid), isDeleted: false },
                { projection: { identities: 0 } },
            );

            return {
                ok: !!dbResult,
                value: dbResult,
            };
        },

        create: async function (data: any): ModelResult<GameConsumable> {
            const cleanData = await dataFormatter(data);
            cleanData._id = getObjectId(randomUUID());
            cleanData.isDeleted = false;

            const { insertedId } = await items.insertOne(cleanData);

            return await model.find(insertedId.toString());
        },

        update: async function (
            uuid: string,
            data: DeepPartial<GameConsumable>,
        ): ModelResult<GameConsumable> {
            const cleanData = await dataFormatter(data);
            const { ok, value } = await items.findOneAndUpdate(
                { _id: getObjectId(uuid) },
                { set: cleanData },
                { projection: {} },
            );

            return { ok: !!ok, value };
        },

        delete: async function (uuid: string): ModelResult<number> {
            const { matchedCount, modifiedCount } = await items.updateOne(
                { _id: getObjectId(uuid) },
                {
                    set: { isDeleted: true, deletedOn: new Date() },
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

export function cleanResponse(data: GameConsumable): ConsumableResponse {
    return Object.assign(omit(data, restrictedKeys), { _id: data._id.toString() });
}
