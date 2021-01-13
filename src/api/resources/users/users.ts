import { ObjectId } from 'mongodb';
import { compareBHash } from '../../utils/security/blowfish';
import * as db from './queries';

export const model = {
    encrypted: ['email'],
    salted: ['password'],
    readOnly: ['uuid'],
};

/**
 * Removes the password field from the user object
 * @param data - Object representing a user model
 */
export const removePassword = (user: User.UserData): User.UserData => {
    delete user.password;
    return user;
};

/**
 * Get a list of active users
 * @param limit - The number of records to fetch
 * @param offset - The number of records to skip
 */
export const get = async (limit: number = 10, offset: number = 0): Promise<User.UserData[]> => {
    const users = await db.getActiveUsers(limit, offset);

    return users.map(removePassword);
};

/**
 * Fetches a user record from the database using the uuid as the search value
 * @param uuid - A valid uuid
 */
export const getOne = async (uuid: string): Promise<User.UserData> => {
    const user = await db.getActiveUserByUuid(new ObjectId(uuid));

    return removePassword(user);
};

/**
 * Fetches a user record from the database using the email address as the search value
 * @param email - A valid email address
 */
export const getByEmail = async (identifier: string): Promise<User.UserData> => {
    const user = await db.getActiveUserByIdentifier(identifier);

    return user;
};

/**
 * Creates a new user record in the database
 * @param data - The fields required to create a new user record
 */
export const create = async (formatter, data: User.UserData): Promise<User.UserData> => {
    const cleanData = await formatter(data);
    const user = await db.createUser(cleanData);

    return removePassword(user);
};

/**
 * Updates a users profile data in the database
 * @param uuid - The UUID for the user to be updated
 * @param data - An object representing a portion of a user object
 */
export const update = async (
    formatter,
    uuid: string,
    data: User.UserData,
): Promise<User.UserData> => {
    const cleanData = await formatter(data);
    const user = await db.updateUser(new ObjectId(uuid), cleanData);

    return removePassword(user);
};

/**
 * Mark a user as inactive
 * @param uuid - The UUID of the user
 */
export const remove = async (uuid: string): Promise<boolean> => {
    return await db.deleteUser(new ObjectId(uuid));
};

/**
 * Compares a submitted password for the given hashed itentifier to a password stored on the system
 * @param identifier - A hashed user identifier
 * @param password - A plain text password
 */
export const authenticate = async (
    identifier: string,
    password: string,
): Promise<User.UserData> => {
    const user = await db.getActiveUserByIdentifier(identifier);
    await compareBHash(password, user.password);

    return removePassword(user);
};

/**
 * Sends an email with a magic activation link.
 * @param email - An identifier ID that represents to aclimit to generate the magic link for
 */
export const sendMagicLink = async (): Promise<boolean> => {
    return true;
};
