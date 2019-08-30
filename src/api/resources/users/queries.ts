import { ObjectId } from 'mongodb';
import { result, withCollection } from '../../db';

const users = withCollection('Users');

/**
 * Retrieve a user with a matching uuid from the database
 * @param uuid - A valid uuid
 */
export async function getActiveUserByUuid(uuid: ObjectId): Promise<User.UserData> {
    const data = await users.findOne({ _id: uuid, isDeleted: false });

    return result('There was an error whilst fetching the user', data);
}

/**
 * Retrieve a user with a matching uuid from the database
 * @param uuid - A valid uuid
 */
export async function getBasicUserDetails(uuid: ObjectId): Promise<User.UserData> {
    const data = await users.findOne(
        { _id: uuid, isDeleted: false },
        { projection: { firstName: 1, lastName: 1, displayName: 1 } }
    );

    return result('There was an error whilst fetching the user', data);
}

/**
 *
 * @param identifier
 */
export async function getActiveUserByIdentifier(identifier: string): Promise<User.UserData> {
    const data = await users.findOne({ isDeleted: false, 'identities.hash': { $eq: identifier } });

    return result('There was an error whilst fetching the user', data);
}

/**
 * Fetch a list of active users from the database filtered by parameters
 * @param limit - The number of records to fetch
 * @param offset - The number of records to skip
 */
export async function getActiveUsers(
    limit: number = 10,
    skip: number = 0
): Promise<User.UserData[]> {
    const data = await users.find({ isDeleted: false }, { limit, skip }).toArray();

    return result('There was an error whilst fetching users', data);
}

/**
 * Create a new user from validated data
 * @param data - The formatted data ready for storage
 */
export async function createUser(userData: User.UserData): Promise<User.UserData> {
    const { insertedId } = await users.insertOne(userData);
    const data = await getActiveUserByUuid(insertedId);

    return result('There was an error whilst creating the user', data);
}

/**
 * Delete a user with a given ID
 * @param uuid - A valid uuid
 */
export async function deleteUser(uuid: ObjectId): Promise<boolean> {
    const data = await users.findOneAndUpdate(
        { _id: uuid },
        { $set: { isDeleted: true } },
        { projection: { isDeleted: 1 } }
    );

    return result('There was an error whilst updating the user', data);
}

/**
 * Updates a user record with the patch provided
 * @param uuid - A UUID representing the user profile to be updated
 * @param data - An object representing a patch on a User profile
 */
export async function updateUser(uuid: ObjectId, userData: User.UserData): Promise<User.UserData> {
    const data = await users.findOneAndUpdate({ _id: uuid }, { $set: { userData } });

    return result('There was an error whilst updating the user', data);
}
