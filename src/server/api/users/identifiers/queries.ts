import { sql, _raw } from "pg-extra";

import { pool, knex } from "../../../db";
import { dbFormat, result } from "../../../utils/db";

export async function getByUserId(
    userId: string,
    props: dbGet = { limit: 10, offset: 0 }
): Promise<any[]> {
    const { limit, offset } = props;
    const queryString = knex("Identities")
        .select("*")
        .where({ userId })
        .limit(limit)
        .offset(offset)
        .toString();
    const query = await pool.many(_raw`${queryString}`);

    return result("There was an error whilst fetching the identities for the user", query);
}

export async function getOne(identifier): Promise<any> {
    const queryString = knex("Identities")
        .select("*")
        .where({ identifier })
        .toString();
    const query = await pool.many(_raw`${queryString}`);
    return result("There was an error whilst fetching the identitiy", query);
}

export async function create(data): Promise<any> {
    const queryString = knex("Identities")
        .returning("*")
        .insert(data)
        .toString();
    const query = await pool.one(_raw`${queryString}`);
    return result("There was an error whilst creating the identitiy", query);
}

export async function remove(uuid: string): Promise<Boolean> {
    const queryString = knex("Identities")
        .returning("true")
        .where({ uuid })
        .del()
        .toString();
    const query = await pool.one(_raw`${queryString}`);
    return result(`There was an error whilst deleting the identitiy with uuid ${uuid}`, !!query);
}

export async function removeAllByUserId(userId: string): Promise<Boolean> {
    const queryString = knex("Identities")
        .returning("true")
        .where({ userId })
        .del()
        .toString();
    const query = await pool.one(_raw`${queryString}`);
    return result(`There was an error whilst deleteing indentities for userId ${userId}`, !!query);
}
