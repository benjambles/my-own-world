import { omit } from '@benjambles/mow-server/dist/utils/data/objects.js';

import {
    formatData,
    getDataFormatter,
    ModelOptions,
} from '@benjambles/mow-server/dist/utils/data/index.js';
import { getObjectId, getOrThrow } from '@benjambles/mow-server/dist/utils/db.js';
import { randomUUID } from 'crypto';
import { Db, ObjectId } from 'mongodb';
import { Env } from '../../../schema/env-schema.js';

const restrictedKeys = [
    'password',
    'identities',
    'gameStates',
    'isDeleted',
    'deletedOn',
    'accessTokens',
] as const;

//#region Types
type RestrictedKeys = typeof restrictedKeys[number];

type ToStringKeys = '_id' | 'createdOn' | 'lastLoggedIn';

type UserResponse = Omit<User, RestrictedKeys | ToStringKeys> & {
    [key in ToStringKeys]: string;
};

export interface User {
    _id: ObjectId;
    createdOn: Date;
    lastLoggedIn?: Date;
    deletedOn?: Date;
    firstName: string;
    gameStates: {};
    identities: {
        hash: string;
        identifier: string;
        isDeleted: boolean;
        type: string;
        verified: boolean;
    }[];
    isDeleted: boolean;
    lastName: string;
    password: string;
    screenName: string;
    accessTokens: { accessToken: string; refreshToken: string; fingerprint: string }[];
}

type NewUser = Pick<User, 'firstName' | 'lastName' | 'password' | 'screenName'>;

//#endregion Types

export function getUserModel(db: Db, { ENC_SECRET }: Env) {
    const formatOptions: ModelOptions = {
        encrypted: [],
        hmac: [],
        readOnly: ['_id'],
        salted: ['password'],
    };

    const formatUserData = formatData(getDataFormatter(ENC_SECRET, formatOptions));
    const users = db.collection<User>('Users');

    const model = {
        formatUserData,
        get: async function (limit: number = 10, skip: number = 0): Promise<User[]> {
            const dbResult = await users
                .find(
                    { isDeleted: false },
                    { limit, projection: { identities: 0, accessTokens: 0 }, skip },
                )
                .toArray();

            return getOrThrow('There was an error whilst fetching users', dbResult);
        },
        find: async function (uuid: string): Promise<User> {
            const dbResult = await users.findOne(
                { _id: getObjectId(uuid), isDeleted: false },
                { projection: { identities: 0, accessTokens: 0 } },
            );

            return getOrThrow('There was an error whilst fetching the user', dbResult);
        },
        create: async function (data: NewUser): Promise<User> {
            const cleanData = await formatUserData(data);

            const { insertedId } = await users.insertOne({
                ...cleanData,
                _id: getObjectId(randomUUID()),
                createdOn: new Date(),
                gameStates: {},
                identities: [],
                isDeleted: false,
                lastLoggedIn: new Date(),
                accessTokens: [],
            });

            return await model.find(
                getOrThrow(
                    'There was an error whilst creating the user',
                    insertedId,
                ).toString(),
            );
        },
        update: async function (uuid: string, userData: Partial<User>): Promise<User> {
            const cleanData = await formatUserData(userData);

            const dbResult = await users.findOneAndUpdate(
                { _id: getObjectId(uuid) },
                { $set: cleanData },
                { projection: { identities: 0, accessTokens: 0 } },
            );

            return getOrThrow(
                'There was an error whilst updating the user',
                dbResult.value,
            );
        },
        delete: async function (uuid: string): Promise<boolean> {
            const { acknowledged } = await users.updateOne(
                { _id: getObjectId(uuid) },
                {
                    $set: { deletedOn: new Date(), isDeleted: true },
                },
            );

            return getOrThrow(
                'There was an error whilst updating the user',
                acknowledged,
            );
        },
        sendMagicLink: async function (): Promise<boolean> {
            return true;
        },
    };

    return model;
}

export function cleanResponse(data: User): UserResponse {
    return {
        ...omit(data, ...restrictedKeys),
        _id: data._id.toString(),
        createdOn: data.createdOn.toISOString(),
        lastLoggedIn: data.lastLoggedIn.toISOString(),
    };
}
