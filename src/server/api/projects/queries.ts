import { sql, _raw } from 'pg-extra';

import { pool, knex } from '../../db';
import { dbFormat, result } from '../../utils/db';

/**
 * Retrieve a project with a matching uuid from the database
 * @param {string} uuid - A valid uuid
 * @returns {Promise<any>}
 */
export async function getActiveProjectByUuid(uuid: string): Promise<any> {
    const queryString = knex('Projects')
        .select('*')
        .where({
            uuid,
            isDeleted: false
        });
    const query = await pool.one(_raw`${queryString}`);
    return result('There was an error whilst fetching the project', query);
}

/**
 * Fetch a list of projects projects from the database filtered by parameters
 * @param {number} limit - The number of projects to fetch
 * @param {number} offset - The number of records to skip
 * @returns {Promise<any[]>}
 */
export async function getProjects(props: dbGet = { limit: 10, offset: 0 }): Promise<any[]> {
    const { limit, offset } = props;
    const queryString = knex('Projects')
        .select('*')
        .where({
            isDeleted: false
        })
        .limit(limit)
        .offset(offset);
    const query = await pool.many(_raw`${queryString}`);
    return result('There was an error whilst fetching projects', query);
}

/**
 * Create a new project from validated data
 * @param {any} data - The formatted data ready for storage
 * @returns {Promise<any>}
 */
export async function createProject(data): Promise<any> {
    const queryString = knex('Projects')
        .returning('*')
        .insert(data);
    const query = await pool.one(_raw`${queryString}`);
    return result('There was an error whilst creating the project', query);
}

/**
 * Delete a project with a given ID
 * @param {string} uuid - A valid uuid
 * @returns {Promise<boolean>}
 */
export async function deleteProject(uuid: string): Promise<boolean> {
    const queryString = knex('Projects')
        .returning('isDeleted')
        .where({ uuid })
        .update({ isDeleted: true });
    const query = await pool.one(_raw`${queryString}`);
    return result('There was an error whilst updating the project', query);
}

/**
 * Updates a project record with the patch provided
 * @param {string} uuid - A UUID representing the project profile to be updated
 * @param {any} data - An object representing a patch on a Project profile
 * @returns {Promise<any>}
 */
export async function updateProject(uuid: string, data): Promise<any> {
    const queryString = knex('Projects')
        .returning('*')
        .update(data);
    const query = await pool.one(_raw`${queryString}`);
    return result('There was an error whilst updating the project', query);
}
