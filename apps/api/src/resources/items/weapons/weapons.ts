import { DeepPartial } from '@benjambles/js-lib/dist/index.js';
import {
    formatData,
    getDataFormatter,
    ModelOptions,
} from '@benjambles/mow-server/dist/utils/data/index.js';
import { omit } from '@benjambles/mow-server/dist/utils/data/objects.js';
import { getObjectId, ModelResult } from '@benjambles/mow-server/dist/utils/db.js';
import { Weapon } from '@benjambles/skirmish-engine/dist/item/weapons/weapons.js';
import { randomUUID } from 'crypto';
import { Db, ObjectId } from 'mongodb';
import { Env } from '../../../schema/env-schema.js';

const restrictedKeys = ['isDeleted'] as const;

//#region Types
export interface GameWeapon extends Weapon {
    _id: ObjectId;
    isDeleted: boolean;
}

export type NewWeapon = Omit<GameWeapon, '_id' | 'isDeleted' | 'isEquipped' | 'entityId'>;

type ToStringKeys = '_id';

type RestrictedKeys = (typeof restrictedKeys)[number];

type WeaponResponse = Omit<GameWeapon, RestrictedKeys | ToStringKeys> & {
    [key in ToStringKeys]: string;
};
//#endregion Types

export function getWeaponModel(db: Db, { ENC_SECRET }: Env) {
    const formatOptions: ModelOptions = {
        encrypted: [],
        salted: [],
        readOnly: ['_id'],
        hmac: [],
    };

    const dataFormatter = formatData(getDataFormatter(ENC_SECRET, formatOptions));
    const items = db.collection<GameWeapon>('Weapons');

    const model = {
        dataFormatter,
        get: async function (
            limit: number = 10,
            skip: number = 0,
        ): ModelResult<GameWeapon[]> {
            const dbResult = await items
                .find({ isDeleted: false }, { projection: {}, skip, limit })
                .toArray();

            return { ok: true, value: dbResult };
        },

        find: async function (uuid: string): ModelResult<GameWeapon> {
            const dbResult = await items.findOne(
                { _id: getObjectId(uuid), isDeleted: false },
                { projection: { identities: 0 } },
            );

            return {
                ok: !!dbResult,
                value: dbResult,
            };
        },

        create: async function (data: any): ModelResult<GameWeapon> {
            const cleanData = await dataFormatter(data);
            cleanData._id = getObjectId(randomUUID());
            cleanData.isDeleted = false;

            const { insertedId } = await items.insertOne(cleanData);

            return await model.find(insertedId.toString());
        },

        update: async function (
            uuid: string,
            data: DeepPartial<GameWeapon>,
        ): ModelResult<GameWeapon> {
            const cleanData = await dataFormatter(data);
            const { ok, value } = await items.findOneAndUpdate(
                { _id: getObjectId(uuid) },
                { set: cleanData },
                { includeResultMetadata: true, projection: {} },
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

export function cleanResponse(data: GameWeapon): WeaponResponse {
    return Object.assign(omit(data, restrictedKeys), { _id: data._id.toString() });
}
