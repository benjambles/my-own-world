import ObjectId from 'mongodb';
import { result, withCollection } from '../../db';

const projects = withCollection('Projects');

/**
 * Retrieve a project with a matching uuid from the database
 * @param uuid - A valid uuid
 */
export const getActiveProjectByUuid = async (uuid: ObjectId): Promise<Project.ProjectData> => {
    const data: Project.ProjectData = await projects.findOne({
        uuid,
        isDeleted: false,
    });

    return result('There was an error whilst fetching the project', data);
};

/**
 * Fetch a list of active projects from the database filtered by parameters
 * @param limit - The number of records to fetch
 * @param skip - The number of records to skip
 */
export const getActiveProjects = async (
    limit: number = 10,
    skip: number = 0,
): Promise<Project.ProjectData[]> => {
    const data: Project.ProjectData[] = await projects
        .find(
            {
                isDeleted: false,
            },
            { limit, skip },
        )
        .toArray();

    return result('There was an error whilst fetching projects', data);
};

/**
 * Create a new project from validated data
 * @param data - The formatted data ready for storage
 */
export const createProject = async (
    projectData: Project.ProjectData,
): Promise<Project.ProjectData> => {
    const { insertedId } = await projects.insertOne(projectData);
    const data = await getActiveProjectByUuid(insertedId);

    return result('There was an error whilst creating the project', data);
};

/**
 * Delete a project with a given ID
 * @param uuid - A valid uuid
 */
export const deleteProject = async (uuid: ObjectId): Promise<boolean> => {
    const data: boolean = await projects.findOneAndUpdate(
        { _id: uuid },
        { $set: { isDeleted: true } },
        { projection: { isDeleted: 1 } },
    );

    return result('There was an error whilst updating the project', data);
};

/**
 * Updates a project record with the patch provided
 * @param uuid - A UUID representing the project to be updated
 * @param data - An object representing a patch on a project
 */
export const updateProject = async (
    uuid: ObjectId,
    projectData: Project.ProjectData,
): Promise<Project.ProjectData> => {
    const data: Project.ProjectData = await projects.findOneAndUpdate(
        { _id: uuid },
        { $set: projectData },
    );

    return result('There was an error whilst updating the project', data);
};
