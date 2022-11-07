import { result } from '@benjambles/mow-server/dist/utils/db.js';
import { AccessLogRow, User } from './users.js';

/**
 * Retrieve a user with a matching uuid from the database
 * @param uuid - A valid uuid
 */
export async function getActiveUserByUuid(users, uuid: string): Promise<User> {
    const data = await users.findOne(
        { _id: uuid, isDeleted: false },
        { projection: { identities: 0 } },
    );

    return result('There was an error whilst fetching the user', data);
}

/**
 * Retrieve a user with a matching uuid from the database
 * @param uuid - A valid uuid
 */
export async function getBasicUserDetails(users, uuid: string): Promise<User> {
    const data = await users.findOne(
        { _id: uuid, isDeleted: false },
        { projection: { firstName: 1, lastName: 1, displayName: 1 } },
    );

    return result('There was an error whilst fetching the user', data);
}

/**
 *
 * @param identifier
 */
export async function getActiveUserByIdentifier(
    users,
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
    users,
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
export async function createUser(users, userData: User): Promise<User> {
    const { insertedId } = await users.insertOne(userData);
    const data = await getActiveUserByUuid(users, insertedId);

    return result('There was an error whilst creating the user', data);
}

/**
 * Delete a user with a given ID
 * @param uuid - A valid uuid
 */
export async function deleteUser(users, uuid: string): Promise<boolean> {
    const data = await users.findOneAndUpdate(
        { _id: uuid },
        { $set: { isDeleted: true, deletedOn: new Date() } },
        { projection: { isDeleted: 1 } },
    );

    return result('There was an error whilst updating the user', data);
}

/**
 * Updates a user record with the patch provided
 * @param uuid - A UUID representing the user profile to be updated
 * @param data - An object representing a patch on a User profile
 */
export async function updateUser(
    users,
    uuid: string,
    userData: Partial<User>,
): Promise<User> {
    const data = await users.findOneAndUpdate(
        { _id: uuid },
        { $set: { userData }, projection: { identities: 0 } },
    );

    return result('There was an error whilst updating the user', data);
}

/**
 * Push a new login to the users access log.
 * @param users - Mongo collection for user data
 * @param uuid - UUID for the user to be updated
 * @param logData - A new log record
 */
export async function updateAccessLog(
    users,
    uuid: string,
    logData: AccessLogRow,
): Promise<User> {
    const data = await users.findOneAndUpdate(
        { _id: uuid },
        { $push: { accessLog: logData }, projection: { identities: 0 } },
    );

    return result('There was an error whilst updating the user', data);
}
