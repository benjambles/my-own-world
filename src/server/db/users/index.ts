import { pool, getUUID } from '../utils/utils';
import { sql, _raw } from 'pg-extra';

export async function getUserByEmail(email: string): Promise<User.UserData> {
    return await pool.one(sql`
        UPDATE users
        SET lastLoggedIn = NOW()
        WHERE ${email} = ${email}
        AND isActive = true
        RETURNING *
    `);
}

export async function getActiveUserByUUID(uuid: string): Promise<User.UserData> {
    return await pool.one(sql`
        SELECT *
        FROM Users
        WHERE uuid = ${uuid}
        AND isActive = true
    `);
}

export async function createUser(data): Promise<User.UserData> {
    return await pool.one();
}

export async function deleteUser(uuid): Promise<boolean> {
    return await pool.one(sql`
        UPDATE users
        SET isActive = false
        WHERE uuid = ${uuid}
        RETURNING isActive
    `);
}