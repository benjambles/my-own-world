import { sql, _raw } from "pg-extra";

import { pool, knex } from "../../db";
import { dbFormat, result } from "../../utils/db";

export async function getUserByEmail(email: string): Promise<User.UserData> {
    const queryString = knex("Users")
        .select("*")
        .where({
            email,
            isActive: true
        });
    const query = await pool.one(_raw`${queryString}`);
    return result("There was an error whilst fetching the user", query);
}

/**
 * Retrieve a user with a matching uuid from the database
 * @param uuid a valid uuid
 */
export async function getActiveUserByUuid(uuid: string): Promise<User.UserData> {
    const queryString = knex("Users")
        .select("*")
        .where({
            uuid,
            isActive: true
        });
    const query = await pool.one(_raw`${queryString}`);
    return result("There was an error whilst fetching the user", query);
}

/**
 * Fetch a list of active users from the database filtered by parameters
 * @param limit The number of users to fetch
 * @param offset The number of records to skip
 */
export async function getActiveUsers(
    props: dbGet = { limit: 10, offset: 0 }
): Promise<User.UserData[]> {
    const { limit, offset } = props;
    const queryString = knex("Users")
        .select("*")
        .where({
            isActive: true
        })
        .limit(limit)
        .offset(offset);
    const query = await pool.many(_raw`${queryString}`);
    return result("There was an error whilst fetching users", query);
}

/**
 * Create a new user from validated data
 * @param data formatted data ready for storage
 */
export async function createUser(data): Promise<User.UserData> {
    const queryString = knex("Users")
        .returning("*")
        .insert(data);
    const query = await pool.one(_raw`${queryString}`);
    return result("There was an error whilst creating the user", query);
}

/**
 * Delete a user with a given ID
 * @param uuid A valid uuid
 */
export async function deleteUser(uuid: string): Promise<boolean> {
    const queryString = knex("Users")
        .returning("isActive")
        .where({ uuid })
        .update({ isActive: false });
    const query = await pool.one(_raw`${queryString}`);
    return result("There was an error whilst updating the user", query);
}

export async function updateUser(uuid: string, data): Promise<User.UserData> {
    const queryString = knex("Users")
        .returning("*")
        .update(data);
    const query = await pool.one(_raw`${queryString}`);
    return result("There was an error whilst updating the user", query);
}
