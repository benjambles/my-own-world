import { result, knex, getOneRaw, getManyRaw } from '../../db';

/**
 * Retrieve a user with a matching uuid from the database
 * @param uuid - A valid uuid
 */
export const getActiveProjectByUuid = async (uuid: string): Promise<Project.ProjectData> => {
    const queryString = knex('Projects')
        .select('*')
        .where({
            uuid,
            isDeleted: false
        });
    const query = await getOneRaw(queryString);
    return result('There was an error whilst fetching the user', query);
};

/**
 * Fetch a list of active users from the database filtered by parameters
 * @param limit - The number of records to fetch
 * @param offset - The number of records to skip
 */
export const getActiveProjects = async (
    limit: number = 10,
    offset: number = 0
): Promise<Project.ProjectData[]> => {
    const queryString = knex('Projects')
        .select('*')
        .where({
            isDeleted: false
        })
        .limit(limit)
        .offset(offset);
    const query = await getManyRaw(queryString);
    return result('There was an error whilst fetching users', query);
};

/**
 * Create a new user from validated data
 * @param data - The formatted data ready for storage
 */
export const createProject = async (data: Project.ProjectData): Promise<Project.ProjectData> => {
    const queryString = knex('Projects')
        .returning('*')
        .insert(data);
    const query = await getOneRaw(queryString);
    return result('There was an error whilst creating the user', query);
};

/**
 * Delete a user with a given ID
 * @param uuid - A valid uuid
 */
export const deleteProject = async (uuid: string): Promise<boolean> => {
    const queryString = knex('Projects')
        .returning('isDeleted')
        .where({ uuid })
        .update({ isDeleted: true });
    const query = await getOneRaw(queryString);
    return result('There was an error whilst updating the user', query);
};

/**
 * Updates a user record with the patch provided
 * @param uuid - A UUID representing the project to be updated
 * @param data - An object representing a patch on a project
 */
export const updateProject = async (
    uuid: string,
    data: Project.ProjectData
): Promise<Project.ProjectData> => {
    const queryString = knex('Projects')
        .returning('*')
        .where({ uuid })
        .update(data);
    const query = await getOneRaw(queryString);
    return result('There was an error whilst updating the user', query);
};
