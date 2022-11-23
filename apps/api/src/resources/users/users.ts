import { omit } from '@benjambles/mow-server/dist/utils/data/objects.js';
import { compareBHash } from '@benjambles/mow-server/dist/utils/security/blowfish.js';

import { ModelOptions } from '@benjambles/mow-server/src/utils/data/index.js';
import { Db } from 'mongodb';
import * as queries from './queries.js';

export const model: ModelOptions = {
    encrypted: ['email'],
    salted: ['password'],
    readOnly: ['_id'],
    hmac: [],
};

const restrictedKeys = ['password', 'identities', 'settings', 'accessLog'] as const;
type RestrictedKeys = typeof restrictedKeys[number];

export type NewUser = Omit<queries.User, 'id'>;
export type UserResponse = Omit<queries.User, RestrictedKeys>;
export const cleanResponse = omit<queries.User, RestrictedKeys>(...restrictedKeys);

/**
 * Get a list of active users
 * @param dbInstance - The MongoDB instance with the collections
 * @param limit - The number of records to fetch
 * @param offset - The number of records to skip
 */
export async function get(
    dbInstance: Db,
    limit: number = 10,
    offset: number = 0,
): Promise<UserResponse[]> {
    const users = dbInstance.collection<queries.User>('Users');
    const userProfiles = await queries.getActiveUsers(users, limit, offset);

    return userProfiles.map(cleanResponse);
}

/**
 * Get a user represented by a the given UUID
 * @param dbInstance - The MongoDB instance with the collection
 * @param uuid - The UUID related to the record to fetch
 */
export async function getOne(dbInstance: Db, uuid: string): Promise<UserResponse> {
    const users = dbInstance.collection<queries.User>('Users');
    const user = await queries.getActiveUserByUuid(users, uuid);

    return cleanResponse(user);
}

/**
 * Fetches a user record from the database using the email address as the search value
 * @param email - A valid email address
 */
export async function getByEmail(
    dbInstance: Db,
    identifier: string,
): Promise<UserResponse> {
    const users = dbInstance.collection<queries.User>('Users');
    const user = await queries.getActiveUserByIdentifier(users, identifier);

    return user;
}

/**
 * Creates a new user record in the database
 * @param data - The fields required to create a new user record
 */
export async function create(
    dbInstance: Db,
    formatter,
    data: NewUser,
): Promise<UserResponse> {
    const cleanData = await formatter(data);
    const users = dbInstance.collection<queries.User>('Users');
    const user = await queries.createUser(users, {
        ...cleanData,
        accessLog: [],
        createdOn: new Date(),
        lastLoggedIn: new Date(),
        settings: queries.defaultUserSettings,
    });

    return cleanResponse(user);
}

/**
 * Updates a users profile data in the database
 * @param uuid - The UUID for the user to be updated
 * @param data - An object representing a portion of a user object
 */
export async function update(
    dbInstance: Db,
    formatter,
    uuid: string,
    data: Partial<queries.User>,
    ip: string,
): Promise<UserResponse> {
    const cleanData = await formatter(data);
    const users = dbInstance.collection<queries.User>('Users');
    const user = await queries.updateUser(users, uuid, cleanData, {
        action: 'update record',
        date: new Date(),
        ip,
    });

    return cleanResponse(user);
}

/**
 * Mark a user as inactive
 * @param uuid - The UUID of the user
 */
export async function remove(dbInstance: Db, uuid: string, ip: string): Promise<boolean> {
    const users = dbInstance.collection<queries.User>('Users');

    return await queries.deleteUser(users, uuid, {
        action: 'delete record',
        date: new Date(),
        ip,
    });
}

/**
 * Compares a submitted password for the given hashed itentifier to a password stored on the system
 * @param identifier - A hashed user identifier
 * @param password - A plain text password
 */
export async function authenticate(
    dbInstance: Db,
    identifier: string,
    password: string,
    ip: string,
): Promise<UserResponse> {
    const users = dbInstance.collection<queries.User>('Users');
    const user = await queries.getActiveUserByIdentifier(users, identifier);
    const accessDate = new Date();

    const acessLogEntry: queries.AccessLogRow = {
        action: 'authenticated',
        date: accessDate,
        ip,
    };

    try {
        await compareBHash(password, user.password);

        queries.updateUser(
            users,
            identifier,
            { lastLoggedIn: accessDate },
            acessLogEntry,
        );
    } catch (e) {
        queries.updateUser(
            users,
            identifier,
            {},
            {
                ...acessLogEntry,
                action: 'failed log in',
            },
        );

        throw e;
    }

    return cleanResponse(user);
}

/**
 * Sends an email with a magic activation link.
 * @param email - An identifier ID that represents to aclimit to generate the magic link for
 */
export async function sendMagicLink(): Promise<boolean> {
    return true;
}
