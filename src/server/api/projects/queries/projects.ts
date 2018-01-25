import { sql } from "pg-extra";

import { pool } from "../../../db";

/**
 *
 * @param limit number Number of projects to fetch, defaults to 10
 * @param offset number Number of projects to skip, defaults to 0
 */
export async function getMany(limit: number = 10, offset: number = 0): Promise<any[]> {
    return await pool.many(sql`
        SELECT *
        FROM "Projects"
        WHERE "isDeleted" = false
        LIMIT ${limit}
        OFFSET ${offset}
    `);
}

/**
 * Fetches a single project based on UUID
 * @param uuid string UUID of the project you wish to fetch
 */
export async function get(uuid: string): Promise<any> {
    return await pool.one(sql`
        SELECT *
        FROM "Projects"
        WHERE uuid = ${uuid}
        AND "isDeleted" = false
    `);
}

export async function create(data: any): Promise<any> {
    const { keys, values } = dbFormat(data);

    return await pool.one(sql`
        INSERT (${keys})
        INTO "Projects"
        VALUES (${values})
        RETURNING *
    `);
}

export async function update(uuid: string, data: any): Promise<any> {
    const { keys, values } = dbFormat(data);

    return await pool.one(sql`
        UPDATE (${keys})
        INTO "Projects"
        VALUES (${values})
        WHERE uuid = ${uuid}
        RETURNING *
    `);
}

export async function remove(uuid: string): Promise<boolean> {
    return await pool.one(sql`
        UPDATE "Projects"
        SET "isDeleted" = true
        WHERE uuid = ${uuid}
        RETURNING "isDeleted"
    `);
}

function dbFormat(data: any): any {
    const keys = Object.keys(data).join(",");
    const values = Object.values(data).join(" ,");

    // TODO: Clean up the values ensure they're formatted correctly for the DB

    return {
        keys,
        values
    };
}
