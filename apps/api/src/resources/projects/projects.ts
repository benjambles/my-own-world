import mongoDB from 'mongodb';
import * as queries from './queries.js';

const { ObjectId } = mongoDB;

export const model = {
    readOnly: ['uuid'],
};

/**
 * Get a list of active projects
 * @param limit - The number of records to fetch
 * @param offset - The number of records to skip
 */
export async function get(
    dbInstance,
    limit: number = 10,
    offset: number = 0,
): Promise<Project.ProjectData[]> {
    const projects = dbInstance.collection('Projects');

    return await queries.getActiveProjects(projects, limit, offset);
}

/**
 * Fetches a project record from the database using the uuid as the search value
 * @param uuid - A valid uuid
 */
export async function getOne(dbInstance, uuid: string): Promise<Project.ProjectData> {
    const projects = dbInstance.collection('Projects');

    return await queries.getActiveProjectByUuid(projects, new ObjectId(uuid));
}

/**
 * Creates a new project record in the database
 * @param data - The fields required to create a new project record
 */
export async function create(
    dbInstance,
    formatter,
    data: Project.Request,
): Promise<Project.ProjectData> {
    const cleanData = await (<Project.ProjectData>formatter(data));
    const projects = dbInstance.collection('Projects');

    return await queries.createProject(projects, cleanData);
}

/**
 * Updates a projects profile data in the database
 * @param uuid - The UUID for the project to be updated
 * @param data - An object representing a portion of a project object
 */
export async function update(
    dbInstance,
    formatter,
    uuid: string,
    data: Project.Request,
): Promise<Project.ProjectData> {
    const cleanData = await (<Project.ProjectData>formatter(data));
    const projects = dbInstance.collection('Projects');

    return await queries.updateProject(projects, new ObjectId(uuid), cleanData);
}

/**
 * Updates a projects profile data in the database
 * @param uuid - The UUID for the project to be updated
 * @param data - An object representing a portion of a project object
 */
export async function remove(dbInstance, uuid: string): Promise<boolean> {
    const projects = dbInstance.collection('Projects');

    return await queries.deleteProject(projects, new ObjectId(uuid));
}
