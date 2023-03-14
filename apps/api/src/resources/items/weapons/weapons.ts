import { DeepPartial } from '@benjambles/js-lib/dist/index.js';
import {
    formatData,
    getDataFormatter,
    ModelOptions,
} from '@benjambles/mow-server/dist/utils/data/index.js';
import { omit } from '@benjambles/mow-server/dist/utils/data/objects.js';
import { getObjectId, getOrThrow } from '@benjambles/mow-server/dist/utils/db.js';
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

type RestrictedKeys = typeof restrictedKeys[number];

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
        get: async function (limit: number = 10, skip: number = 0) {
            const dbResult = await items
                .find({ isDeleted: false }, { projection: {}, skip, limit })
                .toArray();

            return getOrThrow(
                'There was an error whilst fetching the plural',
                dbResult,
            ).map(cleanResponse);
        },

        find: async function (uuid: string) {
            const data = await items.findOne(
                { _id: getObjectId(uuid), isDeleted: false },
                { projection: { identities: 0 } },
            );

            return cleanResponse(
                getOrThrow('There was an error whilst fetching the Weapon', data),
            );
        },

        create: async function (data: any) {
            const cleanData = await dataFormatter(data);
            const { insertedId } = await items.insertOne({
                _id: getObjectId(randomUUID()),
                ...cleanData,
                isDeleted: false,
            });

            return await model.find(
                getOrThrow(
                    'There was an error whilst creating the Weapon',
                    insertedId,
                ).toString(),
            );
        },

        update: async function (uuid: string, data: DeepPartial<GameWeapon>) {
            const cleanData = await dataFormatter(data);
            const dbResult = await items.findOneAndUpdate(
                { _id: getObjectId(uuid) },
                { set: cleanData },
                { projection: {} },
            );

            return cleanResponse(
                getOrThrow(
                    'There was an error whilst updating the Weapon',
                    dbResult.value,
                ),
            );
        },

        delete: async function (uuid: string) {
            const data = await items.findOneAndUpdate(
                { _id: getObjectId(uuid) },
                {
                    set: { isDeleted: true, deletedOn: new Date() },
                },
                { projection: { isDeleted: 1 } },
            );

            return getOrThrow(
                'There was an error whilst updating the Weapon',
                data.ok === 1,
            );
        },
    };

    return model;
}

function cleanResponse(data: GameWeapon): WeaponResponse {
    return {
        ...omit(data, ...restrictedKeys),
        _id: data._id.toString(),
    };
}