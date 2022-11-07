import { compareBHash } from '@benjambles/mow-server/dist/utils/security/blowfish.js';
import mongoDB from 'mongodb';
import * as queries from './queries.js';

export interface User {
    deletedOn?: Date;
    accessLog: AccessLogRow[];
    createdOn: Date;
    firstName: string;
    gameStates: {};
    identities: Identifier[];
    isDeleted: Boolean;
    lastName: string;
    password: string;
    screenName: string;
    settings: UserSettings;
    uuid: string;
}

export interface AccessLogRow {
    date: Date;
    ip: string;
}

interface UserSettings {
    dateFormat: string;
    locale: string;
    timeFormat: string;
}

export type UserResponse = Omit<User, 'password' | 'identities'>;

export interface Identifier {
    identifier: string;
    type: string;
    userId: string;
    uuid: string;
    verified: Boolean;
}

const { ObjectId } = mongoDB;

export const model = {
    encrypted: ['email'],
    salted: ['password'],
    readOnly: ['uuid'],
};

/**
 * Removes an fields that should never be made public by the response,
 * but are still returned in the query for logic purposes.
 * @param data - Object representing a user model
 */
export function cleanResponse(user: User): UserResponse {
    delete user.password;
    delete user.identities;

    return user;
}

/**
 * Get a list of active users
 * @param dbInstance - The MongoDB instance with the collections
 * @param limit - The number of records to fetch
 * @param offset - The number of records to skip
 */
export async function get(
    dbInstance,
    limit: number = 10,
    offset: number = 0,
): Promise<UserResponse[]> {
    const users = dbInstance.collection('Users');
    const userProfiles = await queries.getActiveUsers(users, limit, offset);

    return userProfiles.map(cleanResponse);
}

/**
 * Get a user represented by a the given UUID
 * @param dbInstance - The MongoDB instance with the collection
 * @param uuid - The UUID related to the record to fetch
 */
export async function getOne(dbInstance, uuid: string): Promise<UserResponse> {
    const users = dbInstance.collection('Users');
    const user = await queries.getActiveUserByUuid(users, new ObjectId(uuid));

    return cleanResponse(user);
}

/**
 * Fetches a user record from the database using the email address as the search value
 * @param email - A valid email address
 */
export async function getByEmail(dbInstance, identifier: string): Promise<UserResponse> {
    const users = dbInstance.collection('Users');
    const user = await queries.getActiveUserByIdentifier(users, identifier);

    return user;
}

/**
 * Creates a new user record in the database
 * @param data - The fields required to create a new user record
 */
export async function create(dbInstance, formatter, data: User): Promise<UserResponse> {
    const cleanData = await formatter(data);
    const users = dbInstance.collection('Users');
    const user = await queries.createUser(users, {
        ...cleanData,
        accessLog: [],
        createdOn: new Date(),
        settings: defaultUserSettings,
    });

    return cleanResponse(user);
}

/**
 * Updates a users profile data in the database
 * @param uuid - The UUID for the user to be updated
 * @param data - An object representing a portion of a user object
 */
export async function update(
    dbInstance,
    formatter,
    uuid: string,
    data: Partial<User>,
): Promise<UserResponse> {
    const cleanData = await formatter(data);
    const users = dbInstance.collection('Users');
    const user = await queries.updateUser(users, new ObjectId(uuid), cleanData);

    return cleanResponse(user);
}

/**
 * Mark a user as inactive
 * @param uuid - The UUID of the user
 */
export async function remove(dbInstance, uuid: string): Promise<boolean> {
    const users = dbInstance.collection('Users');

    return await queries.deleteUser(users, new ObjectId(uuid));
}

/**
 * Compares a submitted password for the given hashed itentifier to a password stored on the system
 * @param identifier - A hashed user identifier
 * @param password - A plain text password
 */
export async function authenticate(
    dbInstance,
    identifier: string,
    password: string,
    ip: string,
): Promise<UserResponse> {
    const users = dbInstance.collection('Users');
    const user = await queries.getActiveUserByIdentifier(users, identifier);
    await compareBHash(password, user.password);

    queries.updateAccessLog(users, identifier, { date: new Date(), ip });

    return cleanResponse(user);
}

/**
 * Sends an email with a magic activation link.
 * @param email - An identifier ID that represents to aclimit to generate the magic link for
 */
export async function sendMagicLink(): Promise<boolean> {
    return true;
}

const defaultUserSettings: UserSettings = {
    dateFormat: 'YYYY-MM-DD',
    locale: 'en-GB',
    timeFormat: '24hr',
};
