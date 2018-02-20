import { sql } from "pg-extra";

import { pool } from "../../db";
import { dbFormat, result } from "../../utils/db";

export async function getUserByEmail(email: string): Promise<User.UserData> {
    const query = await pool.one(sql`
        SELECT *
        FROM "Users"
        WHERE email = ${email}
        AND "isActive" = true
    `);

    return result("There was an error whilst fetching the user", query);
}

/**
 * Retrieve a user with a matching email hash from the database
 * @param email an encrypted email address
 */
export async function getUserByIdentity(identity: string): Promise<User.UserData> {
    const query = await pool.one(sql`
        SELECT *
        FROM "Identities"
        WHERE "identity" = ${identity}
        AND "Users".isActive" = true
        RETURNING *
    `);

    return result("There was an error whilst fetching the user", query);
}

/**
 * Retrieve a user with a matching uuid from the database
 * @param uuid a valid uuid
 */
export async function getActiveUserByUuid(uuid: string): Promise<User.UserData> {
    const query = await pool.one(sql`
        SELECT *
        FROM "Users"
        WHERE uuid = ${uuid}
        AND "isActive" = true
    `);

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
    const query = await pool.many(sql`
        SELECT *
        FROM "Users"
        WHERE "isActive" = true
        LIMIT ${limit}
        OFFSET ${offset}
    `);

    return result("There was an error whilst fetching users", query);
}

/**
 * Create a new user from validated data
 * @param data formatted data ready for storage
 */
export async function createUser(data): Promise<User.UserData> {
    const { keys, values } = dbFormat(data);

    return pool.one(sql`
        INSERT (${keys})
        INTO "Users"
        VALUES (${values})
        RETURNING *
    `);
}

/**
 * Delete a user with a given ID
 * @param uuid A valid uuid
 */
export async function deleteUser(uuid: string): Promise<boolean> {
    return pool.one(sql`
        UPDATE "Users"
        SET "isActive" = false
        WHERE uuid = ${uuid}
        RETURNING "isActive"
    `);
}

export async function updateUser(uuid: string, data): Promise<User.UserData> {
    const { keys, values } = dbFormat(data);
    const query = await pool.one(sql`
        INSERT (${keys})
        INTO "Users"
        VALUES (${values})
        WHERE uuid = ${uuid}
        RETURNING *
    `);

    return result("There was an error whilst updating the user", query);
}
