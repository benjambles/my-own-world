import { result } from '@benjambles/mow-server/dist/utils/db.js';
import { Collection, ObjectId } from 'mongodb';
export interface User {
    _id: ObjectId;
    accessLog: AccessLogRow[];
    createdOn: Date;
    lastLoggedIn: Date;
    deletedOn?: Date;
    firstName: string;
    gameStates: {};
    identities: Identifier[];
    isDeleted: Boolean;
    lastName: string;
    password: string;
    screenName: string;
    settings: UserSettings;
}

export interface AccessLogRow {
    date: Date;
    ip: string;
    action: string;
}

interface UserSettings {
    dateFormat: string;
    locale: string;
    timeFormat: string;
}
export interface Identifier {
    _id: string;
    hash: string;
    identifier: string;
    isDeleted: Boolean;
    type: string;
    verified: Boolean;
}

export const defaultUserSettings: UserSettings = {
    dateFormat: 'YYYY-MM-DD',
    locale: 'en-GB',
    timeFormat: '24hr',
};

/**
 * Retrieve a user with a matching uuid from the database
 * @param uuid - A valid uuid
 */
export async function getActiveUserByUuid(
    users: Collection<User>,
    uuid: string,
): Promise<User> {
    const data = await users.findOne(
        { _id: new ObjectId(uuid), isDeleted: false },
        { projection: { identities: 0 } },
    );

    return result('There was an error whilst fetching the user', data);
}

/**
 * Retrieve a user with a matching uuid from the database
 * @param uuid - A valid uuid
 */
export async function getBasicUserDetails(
    users: Collection<User>,
    uuid: string,
): Promise<User> {
    const data = await users.findOne(
        { _id: new ObjectId(uuid), isDeleted: false },
        { projection: { firstName: 1, lastName: 1, displayName: 1 } },
    );

    return result('There was an error whilst fetching the user', data);
}

/**
 *
 * @param identifier
 */
export async function getActiveUserByIdentifier(
    users: Collection<User>,
    identifier: string,
): Promise<User> {
    const data = await users.findOne({
        isDeleted: false,
        'identities.hash': { $eq: identifier },
    });

    return result('There was an error whilst fetching the user', data);
}

/**
 * Fetch a list of active users from the database filtered by parameters
 * @param limit - The number of records to fetch
 * @param offset - The number of records to skip
 */
export async function getActiveUsers(
    users: Collection<User>,
    limit: number = 10,
    skip: number = 0,
): Promise<User[]> {
    const data = await users
        .find({ isDeleted: false }, { projection: { identities: 0 }, skip, limit })
        .toArray();

    return result('There was an error whilst fetching users', data);
}

/**
 * Create a new user from validated data
 * @param data - The formatted data ready for storage
 */
export async function createUser(users: Collection<User>, userData: User): Promise<User> {
    const { insertedId } = await users.insertOne(userData);
    const data = await getActiveUserByUuid(users, insertedId.toString());

    return result('There was an error whilst creating the user', data);
}

/**
 * Delete a user with a given ID
 * @param uuid - A valid uuid
 */
export async function deleteUser(
    users: Collection<User>,
    uuid: string,
    logData: AccessLogRow,
): Promise<boolean> {
    const data = await users.findOneAndUpdate(
        { _id: new ObjectId(uuid) },
        {
            $set: { isDeleted: true, deletedOn: new Date() },
            $push: { accessLog: logData },
        },
        { projection: { isDeleted: 1 } },
    );

    return result('There was an error whilst updating the user', data.ok === 1);
}

/**
 * Updates a user record with the patch provided
 * @param uuid - A UUID representing the user profile to be updated
 * @param data - An object representing a patch on a User profile
 */
export async function updateUser(
    users: Collection<User>,
    uuid: string,
    userData: Partial<User>,
    logData: AccessLogRow,
): Promise<User> {
    const data = await users.findOneAndUpdate(
        { _id: new ObjectId(uuid) },
        { $set: { userData }, $push: { accessLog: logData } },
        { projection: { identities: 0 } },
    );

    return result('There was an error whilst updating the user', data.value);
}
