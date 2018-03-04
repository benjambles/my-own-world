import { sql, _raw } from 'pg-extra';

import { pool, knex } from '../../db';
import { dbFormat, result } from '../../utils/db';

/**
 * Retrieve a user with a matching uuid from the database
 * @param {string} uuid - A valid uuid
 * @returns {Promise<User.UserData>}
 */
export async function getActiveUserByUuid(uuid: string): Promise<User.UserData> {
    const queryString = knex('Users')
        .select('*')
        .where({
            uuid,
            isActive: true
        });
    const query = await pool.one(_raw`${queryString}`);
    return result('There was an error whilst fetching the user', query);
}

/**
 * Fetch a list of active users from the database filtered by parameters
 * @param {number} limit - The number of users to fetch
 * @param {number} offset - The number of records to skip
 * @returns {Promise<User.UserData>}
 */
export async function getActiveUsers(
    props: dbGet = { limit: 10, offset: 0 }
): Promise<User.UserData[]> {
    const { limit, offset } = props;
    const queryString = knex('Users')
        .select('*')
        .where({
            isActive: true
        })
        .limit(limit)
        .offset(offset);
    const query = await pool.many(_raw`${queryString}`);
    return result('There was an error whilst fetching users', query);
}

/**
 * Create a new user from validated data
 * @param {User.UserData} data - The formatted data ready for storage
 * @returns {Promise<User.UserData>}
 */
export async function createUser(data): Promise<User.UserData> {
    const queryString = knex('Users')
        .returning('*')
        .insert(data);
    const query = await pool.one(_raw`${queryString}`);
    return result('There was an error whilst creating the user', query);
}

/**
 * Delete a user with a given ID
 * @param {string} uuid - A valid uuid
 * @returns {Promise<boolean>}
 */
export async function deleteUser(uuid: string): Promise<boolean> {
    const queryString = knex('Users')
        .returning('isActive')
        .where({ uuid })
        .update({ isActive: false });
    const query = await pool.one(_raw`${queryString}`);
    return result('There was an error whilst updating the user', query);
}

/**
 * Updates a user record with the patch provided
 * @param {string} uuid - A UUID representing the user profile to be updated
 * @param {User.UserData} data - An object representing a patch on a User profile
 * @returns {Promise<User.UserData>}
 */
export async function updateUser(uuid: string, data): Promise<User.UserData> {
    const queryString = knex('Users')
        .returning('*')
        .update(data);
    const query = await pool.one(_raw`${queryString}`);
    return result('There was an error whilst updating the user', query);
}
