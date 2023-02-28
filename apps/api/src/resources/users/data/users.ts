import { omit } from '@benjambles/mow-server/dist/utils/data/objects.js';
import { compareBHash } from '@benjambles/mow-server/dist/utils/security/blowfish.js';

import {
    formatData,
    getDataFormatter,
    ModelOptions,
} from '@benjambles/mow-server/dist/utils/data/index.js';
import { getObjectId, getOrThrow } from '@benjambles/mow-server/dist/utils/db.js';
import { randomUUID } from 'crypto';
import { Db, ObjectId } from 'mongodb';
import { Env } from '../../../schema/env-schema.js';

const restrictedKeys = ['password', 'identities', 'settings', 'gameStates'] as const;

const defaultUserSettings: User['settings'] = {
    dateFormat: 'YYYY-MM-DD',
    locale: 'en-GB',
    timeFormat: '24hr',
};

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
    settings: {
        dateFormat: string;
        locale: string;
        timeFormat: string;
    };
}

type NewUser = Pick<User, 'firstName' | 'lastName' | 'password' | 'screenName'>;

//#endregion Types

export const cleanResponse = (data: User): UserResponse => {
    return {
        ...omit(data, ...restrictedKeys),
        _id: data._id.toString(),
        createdOn: data.createdOn.toISOString(),
        lastLoggedIn: data.lastLoggedIn.toISOString(),
    };
};

export function getUserModel(db: Db, { ENC_SECRET }: Env) {
    const formatOptions: ModelOptions = {
        encrypted: [],
        salted: ['password'],
        readOnly: ['_id'],
        hmac: [],
    };

    const formatUserData = formatData(getDataFormatter(ENC_SECRET, formatOptions));
    const users = db.collection<User>('Users');

    const model = {
        formatUserData,
        get: async function (
            limit: number = 10,
            skip: number = 0,
        ): Promise<UserResponse[]> {
            const dbResult = await users
                .find(
                    { isDeleted: false },
                    { projection: { identities: 0 }, skip, limit },
                )
                .toArray();

            return getOrThrow('There was an error whilst fetching users', dbResult).map(
                cleanResponse,
            );
        },

        find: async function (uuid: string): Promise<UserResponse> {
            const dbResult = await users.findOne(
                { _id: getObjectId(uuid), isDeleted: false },
                { projection: { identities: 0 } },
            );

            return cleanResponse(
                getOrThrow('There was an error whilst fetching the user', dbResult),
            );
        },

        findByIdentifier: async function (identifier: string): Promise<User> {
            const dbResult = await users.findOne({
                isDeleted: false,
                'identities.hash': { $eq: identifier },
            });

            return getOrThrow('There was an error whilst fetching the user', dbResult);
        },

        create: async function (data: NewUser): Promise<UserResponse> {
            const cleanData = await formatUserData(data);

            const { insertedId } = await users.insertOne({
                _id: getObjectId(randomUUID()),
                ...cleanData,
                createdOn: new Date(),
                lastLoggedIn: new Date(),
                settings: defaultUserSettings,
                isDeleted: false,
                gameStates: {},
                identities: [],
            });

            return await model.find(
                getOrThrow(
                    'There was an error whilst creating the user',
                    insertedId,
                ).toString(),
            );
        },

        update: async function (
            uuid: string,
            data: Partial<User>,
        ): Promise<UserResponse> {
            const cleanData = await formatUserData(data);

            const dbResult = await users.findOneAndUpdate(
                { _id: getObjectId(uuid) },
                { $set: { ...cleanData } },
                { projection: { identities: 0 } },
            );

            return cleanResponse(
                getOrThrow('There was an error whilst updating the user', dbResult.value),
            );
        },

        delete: async function (uuid: string): Promise<boolean> {
            const { acknowledged } = await users.updateOne(
                { _id: getObjectId(uuid) },
                {
                    $set: { isDeleted: true, deletedOn: new Date() },
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

        authenticate: async function (
            identifier: string,
            password: string,
        ): Promise<UserResponse> {
            const user = await model.findByIdentifier(identifier);
            const accessDate = new Date();

            await compareBHash(password, user.password);

            return model.update(user._id.toString(), { lastLoggedIn: accessDate });
        },
    };

    return model;
}
