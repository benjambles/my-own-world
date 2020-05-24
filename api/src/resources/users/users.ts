import { ObjectId } from 'mongodb';
import { dissoc, partial } from 'ramda';
import { formatter } from '../../utils/data/formatter';
import { compareBHash } from '../../utils/security/blowfish';
import { hmac } from '../../utils/security/encrpytion';
import * as db from './queries';

const format = {
    encrypted: ['email'],
    salted: ['password'],
    readOnly: ['uuid'],
};

/**
 * Returns a function that clones of the data retrieved from the database and sanitizes it if necessary
 * @param secure - True if sanitization is required
 * @param data - Object representing a user model
 */
const respond = (secure: boolean, data: User.UserData): User.UserData => {
    return secure ? dissoc('password', data) : data;
};

/**
 * Prepares a user object for database insertion
 */
export const cleanUserData = formatter(format);

/**
 * Returns a sanitised object representing a user, removing private properties
 * @param data - A database record representing a user
 */
export const sanitizedResponse = partial(respond, [true]);

/**
 * Returns a clone of an object representing a user
 * @param data - A database record representing a user
 */
export const unsanitizedResponse = partial(respond, [false]);

/**
 * Get a list of active users
 * @param limit - The number of records to fetch
 * @param offset - The number of records to skip
 */
export const get = async (limit: number = 10, offset: number = 0): Promise<User.UserData[]> => {
    const users = await db.getActiveUsers(limit, offset);

    return users.map(sanitizedResponse);
};

/**
 * Fetches a user record from the database using the uuid as the search value
 * @param uuid - A valid uuid
 */
export const getOne = async (uuid: string): Promise<User.UserData> => {
    const user = await db.getActiveUserByUuid(new ObjectId(uuid));

    return sanitizedResponse(user);
};

/**
 * Fetches a user record from the database using the email address as the search value
 * @param email - A valid email address
 */
export const getByEmail = async (identifier: string): Promise<User.UserData> => {
    const hash = await hmac(identifier);
    const user = await db.getActiveUserByIdentifier(hash);

    return unsanitizedResponse(user);
};

/**
 * Creates a new user record in the database
 * @param data - The fields required to create a new user record
 */
export const create = async (data: User.UserData): Promise<User.UserData> => {
    const cleanData = await cleanUserData(data);
    const user = await db.createUser(cleanData);

    return sanitizedResponse(user);
};

/**
 * Updates a users profile data in the database
 * @param uuid - The UUID for the user to be updated
 * @param data - An object representing a portion of a user object
 */
export const update = async (uuid: string, data: User.UserData): Promise<User.UserData> => {
    const cleanData = await cleanUserData(data);
    const user = await db.updateUser(new ObjectId(uuid), cleanData);

    return sanitizedResponse(user);
};

/**
 * Mark a user as inactive
 * @param uuid - The UUID of the user
 */
export const remove = async (uuid: string): Promise<boolean> => {
    return await db.deleteUser(new ObjectId(uuid));
};

/**
 * Compares a submitted password for the given itentifier to a password stored on the system
 * @param identifier - A hashed user identifier
 * @param password - A plain text password
 */
export const authenticate = async (
    identifier: string,
    password: string
): Promise<User.UserData> => {
    const hash = await hmac(identifier);
    const user = await db.getActiveUserByIdentifier(hash);
    await compareBHash(password, user.password);

    return sanitizedResponse(user);
};

/**
 * Sends an email with a magic activation link.
 * @param email - An identifier ID that represents to aclimit to generate the magic link for
 */
export const sendMagicLink = async (): Promise<boolean> => {
    return true;
};
