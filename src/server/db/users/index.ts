import { sql } from 'pg-extra';
import { pool } from '../';
import { getUUID } from '../../lib/utils';

export async function getUserByEmail(email: string): Promise<User.UserData> {
    return await pool.one(sql`
        UPDATE "Users"
        SET "lastLoggedIn" = NOW()
        WHERE ${email} = ${email}
        AND "isActive" = true
        RETURNING *
    `);
}

export async function getActiveUserByUUID(uuid: string): Promise<User.UserData> {
    return await pool.one(sql`
        SELECT *
        FROM "Users"
        WHERE uuid = ${uuid}
        AND "isActive" = true
    `);
}

export async function getActiveUsers(limit: number = 10, offset: number = 0): Promise<User.UserData[]> {
    return await pool.many(sql`
        SELECT *
        FROM "Users"
        WHERE "isActive" = true
        LIMIT ${limit}
        OFFSET ${offset}
    `);
}

export async function createUser(data): Promise<User.UserData> {
    return await pool.one();
}

export async function deleteUser(uuid): Promise<boolean> {
    return await pool.one(sql`
        UPDATE "Users"
        SET "isActive" = false
        WHERE uuid = ${uuid}
        RETURNING "isActive"
    `);
}