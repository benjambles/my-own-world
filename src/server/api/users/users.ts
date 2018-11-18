import { cleanData, cloneData, format, getUUID } from '../../utils';
import { compareBHash } from '../../utils/security';
import * as db from './queries';
import * as Identities from './identifiers/identifiers';

const formatters = {
    encrypted: ['email'],
    hashed: { salted: ['password'] },
    readOnly: ['uuid']
};

/**
 * Prepares a user object for database insertion
 */
export const formatUser = format(formatters);
export const cleanUserData = cleanData(formatUser);

/**
 * Returns a sanitised object representing a user, removing private properties
 * @param {User.UserData} data - A database record representing a user
 * @returns {User.UserData}
 */
export const sanitizedResponse = respond(true);

/**
 * Returns a clone of an object representing a user
 * @param {User.UserData} data - A database record representing a user
 * @returns {User.UserData}
 */
export const unsanitizedResponse = respond(false);

/**
 * Get a list of active users
 * @param {number} limit - The number of records to fetch
 * @param {number} offset - The number of records to skip
 * @returns {Promise<User.UserData[]}
 */
export async function get(limit: number = 10, offset: number = 0): Promise<User.UserData[]> {
    const users = await db.getActiveUsers(limit, offset);
    return users.map(sanitizedResponse);
}

/**
 * Fetches a user record from the database using the uuid as the search value
 * @param {string} uuid - A valid uuid
 */
export async function getOne(uuid: string): Promise<User.UserData> {
    const user = await db.getActiveUserByUuid(uuid);
    return sanitizedResponse(user);
}

/**
 * Fetches a user record from the database using the email address as the search value
 * @param {string} email - A valid email address
 */
export async function getByEmail(identifier: string): Promise<User.UserData> {
    const identity = await Identities.getByIndentifier(identifier);
    const user = await getOne(identity.userId);
    return unsanitizedResponse(user);
}

/**
 * Creates a new user record in the database
 * @param {User.UserData} data - The fields required to create a new user record
 * @returns {Promise<User.UserData}
 */
export async function create(data: User.UserData): Promise<User.UserData> {
    const cleanData = await cleanUserData(data);
    cleanData.uuid = getUUID(JSON.stringify(data));
    const user = await db.createUser(cleanData);
    return sanitizedResponse(user);
}

/**
 * Updates a users profile data in the database
 * @param {string} uuid - The UUID for the user to be updated
 * @param {User.UserData} data - An object representing a portion of a user object
 * @returns {Promise<User.UserData>}
 */
export async function update(uuid: string, data: User.UserData): Promise<User.UserData> {
    const cleanData = await cleanUserData(data);
    const user = await db.updateUser(uuid, cleanData);
    return sanitizedResponse(user);
}

/**
 * Mark a user as inactive
 * @param {string} uuid - The UUID of the user
 * @returns {Promise<boolean>}
 */
export const remove = db.deleteUser;

/**
 * Compares a submitted password for the given itentifier to a password stored on the system
 * @param {string} identifier - A hashed user identifier
 * @param {string} password - A plain text password
 * @returns {Promise<User.UserData>}
 */
export async function authenticate(identifier: string, password: string): Promise<User.UserData> {
    const identity = await Identities.getByIndentifier(identifier);
    const user = await db.getActiveUserByUuid(identity.userId);
    await compareBHash(password, user.password);

    return sanitizedResponse(user);
}

/**
 * Sends an email with a magic activation link.
 * @param {string} email - An identifier ID that represents to aclimit to generate the magic link for
 */
export async function sendMagicLink(email: string): Promise<Boolean> {
    return true;
}

/**
 * Returns a function that clones of the data retrieved from the database and sanitizes it if necessary
 * @param {boolean} secure - True if sanitization is required
 * @returns {Function}
 */
export function respond(secure: boolean) {
    return (data: User.UserData): User.UserData => {
        let safeData = cloneData(data);

        if (secure) {
            delete safeData.password;
        }

        return safeData;
    };
}
