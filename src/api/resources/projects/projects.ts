import ObjectId from 'mongodb';
import * as db from './queries';

export const model = {
    readOnly: ['uuid'],
};

/**
 * Get a list of active projects
 * @param limit - The number of records to fetch
 * @param offset - The number of records to skip
 */
export const get = async (
    limit: number = 10,
    offset: number = 0,
): Promise<Project.ProjectData[]> => {
    return await db.getActiveProjects(limit, offset);
};

/**
 * Fetches a project record from the database using the uuid as the search value
 * @param uuid - A valid uuid
 */
export const getOne = async (uuid: string): Promise<Project.ProjectData> => {
    return await db.getActiveProjectByUuid(new ObjectId(uuid));
};

/**
 * Creates a new project record in the database
 * @param data - The fields required to create a new project record
 */
export const create = async (formatter, data: Project.Request): Promise<Project.ProjectData> => {
    const cleanData = await (<Project.ProjectData>formatter(data));

    return await db.createProject(cleanData);
};

/**
 * Updates a projects profile data in the database
 * @param uuid - The UUID for the project to be updated
 * @param data - An object representing a portion of a project object
 */
export const update = async (
    formatter,
    uuid: string,
    data: Project.Request,
): Promise<Project.ProjectData> => {
    const cleanData = await (<Project.ProjectData>formatter(data));

    return await db.updateProject(new ObjectId(uuid), cleanData);
};

/**
 * Mark a project as inactive
 * @param uuid - The UUID of the project
 */
export const remove = async (uuid: string): Promise<boolean> => {
    return await db.deleteProject(new ObjectId(uuid));
};
