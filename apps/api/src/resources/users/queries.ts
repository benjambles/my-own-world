import { getObjectId, result } from '@benjambles/mow-server/dist/utils/db.js';
import { randomUUID } from 'crypto';
import { Db, ObjectId } from 'mongodb';

//#region Types
export interface User {
    _id: ObjectId;
    createdOn: Date;
    lastLoggedIn: Date;
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

export type NewUser = Pick<User, 'firstName' | 'lastName' | 'password' | 'screenName'>;

export type UserSettings = User['settings'];

export type Identifier = User['identities'][number];
//#endregion Types

export function getUserHelpers(db: Db) {
    const users = db.collection<User>('Users');

    const defaultUserSettings: UserSettings = {
        dateFormat: 'YYYY-MM-DD',
        locale: 'en-GB',
        timeFormat: '24hr',
    };

    const helpers = {
        find: async function getByUuid(uuid: string): Promise<User> {
            const data = await users.findOne(
                { _id: getObjectId(uuid), isDeleted: false },
                { projection: { identities: 0 } },
            );

            return result('There was an error whilst fetching the user', data);
        },

        findByIdentifier: async function getActiveUserByIdentifier(
            identifier: string,
        ): Promise<User> {
            const data = await users.findOne({
                isDeleted: false,
                'identities.hash': { $eq: identifier },
            });

            return result('There was an error whilst fetching the user', data);
        },

        get: async function getUsers(
            limit: number = 10,
            skip: number = 0,
            projection = {},
        ): Promise<User[]> {
            const data = await users
                .find(
                    { isDeleted: false },
                    { projection: { identities: 0, ...projection }, skip, limit },
                )
                .toArray();

            return result('There was an error whilst fetching users', data);
        },

        create: async function createUser(userData: NewUser): Promise<User> {
            const { insertedId } = await users.insertOne({
                _id: getObjectId(randomUUID()),
                ...userData,
                createdOn: new Date(),
                lastLoggedIn: new Date(),
                settings: defaultUserSettings,
                isDeleted: false,
                gameStates: {},
                identities: [],
            });
            const data = await helpers.find(insertedId.toString());

            return result('There was an error whilst creating the user', data);
        },

        delete: async function deleteUser(uuid: string): Promise<boolean> {
            const data = await users.findOneAndUpdate(
                { _id: getObjectId(uuid) },
                {
                    $set: { isDeleted: true, deletedOn: new Date() },
                },
                { projection: { isDeleted: 1 } },
            );

            return result('There was an error whilst updating the user', data.ok === 1);
        },

        update: async function updateUser(
            uuid: string,
            userData: Partial<User>,
        ): Promise<User> {
            const data = await users.findOneAndUpdate(
                { _id: getObjectId(uuid) },
                { $set: { ...userData } },
                { projection: { identities: 0 } },
            );

            return result('There was an error whilst updating the user', data.value);
        },
    };

    return helpers;
}
