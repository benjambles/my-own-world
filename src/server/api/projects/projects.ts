import { cleanData, cloneData, format, getUUID } from '../../utils';
import * as db from './queries';

const formatters = {
    encrypted: ['email'],
    hashed: { salted: ['password'] },
    readOnly: ['uuid']
};

/**
 * Prepares a project object for database insertion
 */
export const formatProject = format(formatters);
export const cleanProjectData = cleanData(formatProject);

/**
 * Get a list of active projects
 * @param limit - The number of records to fetch
 * @param offset - The number of records to skip
 */
export async function get(limit: number = 10, offset: number = 0): Promise<Project.ProjectData[]> {
    const projects = await db.getActiveProjects(limit, offset);
    return projects.map(respond);
}

/**
 * Fetches a project record from the database using the uuid as the search value
 * @param uuid - A valid uuid
 */
export async function getOne(uuid: string): Promise<Project.ProjectData> {
    const project = await db.getActiveProjectByUuid(uuid);
    return respond(project);
}

/**
 * Creates a new project record in the database
 * @param data - The fields required to create a new project record
 */
export async function create(data: Project.Request): Promise<Project.ProjectData> {
    const cleanData = await cleanProjectData(data);
    cleanData.uuid = getUUID(JSON.stringify(data));
    const project = await db.createProject(cleanData);
    return respond(project);
}

/**
 * Updates a projects profile data in the database
 * @param uuid - The UUID for the project to be updated
 * @param data - An object representing a portion of a project object
 */
export async function update(uuid: string, data: Project.Request): Promise<Project.ProjectData> {
    const cleanData = await cleanProjectData(data);
    const project = await db.updateProject(uuid, cleanData);
    return respond(project);
}

/**
 * Mark a project as inactive
 * @param uuid - The UUID of the project
 */
export const remove = db.deleteProject;

/**
 * Returns a function that clones of the data retrieved from the database and sanitizes it if necessary
 * @param data The data to modify before responding
 */
export function respond(data: Project.ProjectData): Project.ProjectData {
    return cloneData(data);
}
