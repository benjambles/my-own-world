import { sql } from 'pg-extra';
import { pool } from '../';
import { getUUID } from '../../lib/utils';

/**
 * Retrieve a user with a matching email hash from the database
 * @param email an encrypted email address
 */
export async function getUserByEmail(email: string): Promise<User.UserData> {
    return await pool.one(sql`
        UPDATE "Users"
        SET "lastLoggedIn" = NOW()
        WHERE "email" = ${email}
        AND "isActive" = true
        RETURNING *
    `);
}

/**
 * Retrieve a user with a matching uuid from the database 
 * @param uuid a valid uuid
 */
export async function getActiveUserByUUID(uuid: string): Promise<User.UserData> {
    return await pool.one(sql`
        SELECT *
        FROM "Users"
        WHERE uuid = ${uuid}
        AND "isActive" = true
    `);
}

/**
 * Fetch a list of active users from the database filtered by parameters
 * @param limit The number of users to fetch
 * @param offset The number of records to skip
 */
export async function getActiveUsers(limit: number = 10, offset: number = 0): Promise<User.UserData[]> {
    return await pool.many(sql`
        SELECT *
        FROM "Users"
        WHERE "isActive" = true
        LIMIT ${limit}
        OFFSET ${offset}
    `);
}

/**
 * Create a new user from validated data
 * @param data formatted data ready for storage
 */
export async function createUser(data): Promise<User.UserData> {
    return await pool.one();
}

/**
 * Delete a user with a given ID
 * @param uuid A valid uuid
 */
export async function deleteUser(uuid): Promise<boolean> {
    return await pool.one(sql`
        UPDATE "Users"
        SET "isActive" = false
        WHERE uuid = ${uuid}
        RETURNING "isActive"
    `);
}