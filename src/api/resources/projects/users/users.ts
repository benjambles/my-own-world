import { ObjectId } from 'mongodb';
import { getBasicUserDetails } from '../../users/queries';
import { sanitizedResponse } from '../../users/users';
import { deleteProjectUser, getActiveProjectUsers, setUserRoles } from './queries';

/**
 * Get a list of active projects
 * @param projectId - The unique identifier for the project
 * @param limit - The number of records to fetch
 * @param offset - The number of records to skip
 */
export const get = async (projectId: string): Promise<any[]> => {
    const projectUsers = await getActiveProjectUsers(new ObjectId(projectId));

    return Promise.all(
        projectUsers.map(async ({ id, role }) => {
            const user = await getBasicUserDetails(new ObjectId(id));
            return { user: sanitizedResponse(user), role };
        }),
    );
};

/**
 * Creates a new project user and sets their roles
 * @param projectId
 * @param userId
 * @param roles
 */
export const createUser = async (projectId, userId, roles): Promise<boolean> => {
    const roleIds = roles.map((id: string) => new ObjectId(id));
    return await setUserRoles(new ObjectId(projectId), new ObjectId(userId), roleIds);
};

/**
 * Updates an existing project user and sets their roles
 * @param projectId
 * @param userId
 * @param roles
 */
export const updateUserRoles = async (projectId, userId, roles): Promise<boolean> => {
    const roleIds = roles.map((id: string) => new ObjectId(id));
    return await setUserRoles(new ObjectId(projectId), new ObjectId(userId), roleIds);
};

/**
 * Removes all access roles from a project user
 * @param projectId
 * @param userId
 */
export const deleteUser = async (projectId, userId): Promise<boolean> => {
    return await deleteProjectUser(new ObjectId(projectId), new ObjectId(userId));
};
