import formatter from '../../utils/data/formatter';
import getUUID from '../../utils/uuids/get-uuid';
import * as db from './queries';

const format = {
    encrypted: ['email'],
    salted: ['password'],
    readOnly: ['uuid']
};

/**
 * Prepares a project object for database insertion
 */
const cleanProjectData = formatter(format);

/**
 * Get a list of active projects
 * @param limit - The number of records to fetch
 * @param offset - The number of records to skip
 */
export const get = async (
    limit: number = 10,
    offset: number = 0
): Promise<Project.ProjectData[]> => {
    const projects = await db.getActiveProjects(limit, offset);
    return projects;
};

/**
 * Fetches a project record from the database using the uuid as the search value
 * @param uuid - A valid uuid
 */
export const getOne = async (uuid: string): Promise<Project.ProjectData> => {
    const project = await db.getActiveProjectByUuid(uuid);
    return project;
};

/**
 * Creates a new project record in the database
 * @param data - The fields required to create a new project record
 */
export const create = async (data: Project.Request): Promise<Project.ProjectData> => {
    const cleanData = (await cleanProjectData(data)) as Project.ProjectData;
    cleanData.uuid = getUUID(JSON.stringify(data));
    const project = await db.createProject(cleanData);
    return project;
};

/**
 * Updates a projects profile data in the database
 * @param uuid - The UUID for the project to be updated
 * @param data - An object representing a portion of a project object
 */
export const update = async (uuid: string, data: Project.Request): Promise<Project.ProjectData> => {
    const cleanData = (await cleanProjectData(data)) as Project.ProjectData;
    const project = await db.updateProject(uuid, cleanData);
    return project;
};

/**
 * Mark a project as inactive
 * @param uuid - The UUID of the project
 */
export const remove = db.deleteProject;
