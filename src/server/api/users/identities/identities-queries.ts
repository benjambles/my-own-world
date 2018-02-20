import { sql } from "pg-extra";

import { pool } from "../../../db";
import { dbFormat, result } from "../../../utils/db";

export async function getByUserId(
    userId: string,
    props: dbGet = { limit: 10, offset: 0 }
): Promise<User.Identity[]> {
    const { limit, offset } = props;
    const query = await pool.one(sql`
        SELECT *
        FROM "Identities"
        WHERE userId = ${userId}
        LIMIT = ${limit}
        OFFSET = ${offset}
    `);

    return result("There was an error whilst fetching the identities for the user", query);
}

export async function getOne(identifier): Promise<User.Identity> {
    const query = await pool.one(sql`
        SELECT *
        FROM "Identities"
        WHERE identifier = ${identifier}
    `);

    return result("There was an error whilst fetching the identitiy", query);
}

export async function create(data: User.Identity): Promise<User.Identity> {
    const { keys, values } = dbFormat(data);
    const query = await pool.one(sql`
        INSERT (${keys})
        INTO "Identities"
        VALUES (${values})
        RETURNING *
    `);
    return result("There was an error whilst creating the identitiy", query);
}

export async function update(uuid: string, data: User.Identity): Promise<User.Identity> {
    const { keys, values } = dbFormat(data);
    const query = await pool.one(sql`
        INSERT (${keys})
        INTO "Identities"
        VALUES (${values})
        WHERE uuid = ${uuid}
        RETURNING *
    `);
    return result(
        `There was an error whilst updating the identitiy with uuid ${uuid} with keys ${keys} and values ${values}`,
        query
    );
}

export async function remove(uuid: string): Promise<Boolean> {
    const query = await pool.one(sql`
        DELETE
        FROM "Identities"
        WHERE uuid = ${uuid}
        RETURNING true
    `);
    return result(`There was an error whilst deleting the identitiy with uuid ${uuid}`, !!query);
}

export async function removeAllByUserId(userId: string): Promise<Boolean> {
    const query = await pool.one(sql`
        DELETE
        FROM "Identities"
        WHERE userId = ${userId}
        RETURNING true
    `);
    return result(`There was an error whilst deleteing indentities for userId ${userId}`, !!query);
}
