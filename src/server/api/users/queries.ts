import { result, knex, getOneRaw, getManyRaw } from '../../db';

/**
 * Retrieve a user with a matching uuid from the database
 * @param uuid - A valid uuid
 */
export const getActiveUserByUuid = async (uuid: string): Promise<User.UserData> => {
    const queryString = knex('Users')
        .select('*')
        .where({
            uuid,
            isDeleted: false
        });
    const query = await getOneRaw(queryString);
    return result('There was an error whilst fetching the user', query);
};

/**
 * Fetch a list of active users from the database filtered by parameters
 * @param limit - The number of records to fetch
 * @param offset - The number of records to skip
 */
export const getActiveUsers = async (
    limit: number = 10,
    offset: number = 0
): Promise<User.UserData[]> => {
    const queryString = knex('Users')
        .select('*')
        .where({
            isDeleted: false
        })
        .limit(limit)
        .offset(offset);
    const query = await getManyRaw(queryString);
    return result('There was an error whilst fetching users', query);
};

/**
 * Create a new user from validated data
 * @param data - The formatted data ready for storage
 */
export const createUser = async (data: User.UserData): Promise<User.UserData> => {
    const queryString = knex('Users')
        .returning('*')
        .insert(data);
    const query = await getOneRaw(queryString);
    return result('There was an error whilst creating the user', query);
};

/**
 * Delete a user with a given ID
 * @param uuid - A valid uuid
 */
export const deleteUser = async (uuid: string): Promise<boolean> => {
    const queryString = knex('Users')
        .returning('isDeleted')
        .where({ uuid })
        .update({ isDeleted: true });
    const query = await getOneRaw(queryString);
    return result('There was an error whilst updating the user', query);
};

/**
 * Updates a user record with the patch provided
 * @param uuid - A UUID representing the user profile to be updated
 * @param data - An object representing a patch on a User profile
 */
export const updateUser = async (uuid: string, data: User.UserData): Promise<User.UserData> => {
    const queryString = knex('Users')
        .returning('*')
        .where({ uuid })
        .update(data);
    const query = await getOneRaw(queryString);
    return result('There was an error whilst updating the user', query);
};
