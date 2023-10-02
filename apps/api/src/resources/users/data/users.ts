import { omit } from '@benjambles/mow-server/dist/utils/data/objects.js';

import {
    formatData,
    getDataFormatter,
} from '@benjambles/mow-server/dist/utils/data/index.js';
import { ModelResult, getObjectId } from '@benjambles/mow-server/dist/utils/db.js';
import { Db, ObjectId } from 'mongodb';
import { Env } from '../../../schema/env-schema.js';

const restrictedKeys = [
    'accessTokens',
    'deletedOn',
    'identities',
    'isDeleted',
    'password',
] as const;

//#region Types
type RestrictedKeys = (typeof restrictedKeys)[number];

type ToStringKeys = '_id' | 'createdOn' | 'lastLoggedIn';

type UserResponse = Omit<User, RestrictedKeys | ToStringKeys> & {
    [key in ToStringKeys]: string;
};

export type User = {
    _id: ObjectId;
    accessTokens: {
        accessToken: string;
        fingerprint: string;
        refreshToken: string;
    }[];
    createdOn: Date;
    deletedOn?: Date;
    firstName?: string;
    identities: {
        hash: string;
        identifier: string;
        isDeleted: boolean;
        type: string;
        verified: boolean;
    }[];
    isDeleted: boolean;
    lastLoggedIn?: Date;
    lastName?: string;
    password: string;
    screenName: string;
};

type NewUser = Pick<User, 'password' | 'screenName'>;

export function getUserCollection(db: Db) {
    return db.collection<User>('Users');
}

//#endregion Types

export function getUserModel(db: Db, { ENC_SECRET }: Env) {
    const formatUserData = formatData(
        getDataFormatter(ENC_SECRET, {
            salted: ['password'],
        }),
    );

    const users = getUserCollection(db);

    const model = {
        formatUserData,
        get: async function (limit: number = 10, skip: number = 0): ModelResult<User[]> {
            const dbResult = await users
                .find(
                    { isDeleted: false },
                    { limit, projection: { accessTokens: 0, identities: 0 }, skip },
                )
                .toArray();

            return { ok: true, value: dbResult };
        },
        find: async function (uuid: string): ModelResult<User> {
            const userResult = await users.findOne(
                { _id: getObjectId(uuid), isDeleted: false },
                { projection: { accessTokens: 0, identities: 0 } },
            );

            return { ok: !!userResult, value: userResult };
        },
        create: async function (data: NewUser): ModelResult<User> {
            const cleanData = await formatUserData(data);

            const { insertedId } = await users.insertOne(
                Object.assign(cleanData, {
                    _id: getObjectId(),
                    accessTokens: [],
                    createdOn: new Date(),
                    identities: [],
                    isDeleted: false,
                    lastLoggedIn: new Date(),
                }),
            );

            return await model.find(insertedId.toString());
        },
        update: async function (
            uuid: string,
            userData: Partial<User>,
        ): ModelResult<User> {
            const cleanData = await formatUserData(userData);

            const { ok, value } = await users.findOneAndUpdate(
                { _id: getObjectId(uuid) },
                { $set: cleanData },
                {
                    includeResultMetadata: true,
                    projection: { accessTokens: 0, identities: 0 },
                },
            );

            return { ok: !!ok, value };
        },
        delete: async function (uuid: string): ModelResult<number> {
            const { matchedCount, modifiedCount } = await users.updateOne(
                { _id: getObjectId(uuid) },
                {
                    $set: { accessTokens: [], deletedOn: new Date(), isDeleted: true },
                },
            );

            return {
                ok: !!matchedCount && matchedCount === modifiedCount,
                value: matchedCount,
            };
        },
        sendMagicLink: async function (): Promise<boolean> {
            return true;
        },
    };

    return model;
}

export function cleanResponse(data: User): UserResponse {
    return Object.assign(omit(data, restrictedKeys), {
        _id: data._id.toString(),
        createdOn: data.createdOn.toISOString(),
        lastLoggedIn: data.lastLoggedIn.toISOString(),
    });
}
