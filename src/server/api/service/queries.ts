import { sql, _raw } from 'pg-extra';

import { pool, knex } from '../../db';
import { dbFormat, result } from '../../utils/db';

export async function getVersion(): Promise<any> {
    const queryString = knex('System')
        .select('*')
        .where({
            key: 'api_version'
        });
    const query = await pool.one(_raw`${queryString}`);
    return result('There was an error whilst fetching the api version', query);
}
