import { ObjectId } from 'mongodb';
import { getBasicUserDetails } from '../../users/queries';
import { sanitizedResponse } from '../../users/users';
import { getActiveProjectUsers, setUserRoles, deleteProjectUser } from './queries';

/**
 * Get a list of active projects
 * @param projectId - The unique identifier for the project
 * @param limit - The number of records to fetch
 * @param offset - The number of records to skip
 */
export async function get(
    projectId: string,
    limit: number = 10,
    offset: number = 0
): Promise<any[]> {
    const projectUsers = await getActiveProjectUsers(new ObjectId(projectId));

    return Promise.all(
        projectUsers.map(({ id, role }) => {
            const user = getBasicUserDetails(new ObjectId(id));
            return sanitizedResponse({ user, role });
        })
    );
}

/**
 * Creates a new project user and sets their roles
 * @param projectId
 * @param userId
 * @param roles
 */
export async function createUser(projectId, userId, roles): Promise<boolean> {
    const roleIds = roles.map(id => new ObjectId(id));
    return await setUserRoles(new ObjectId(projectId), new ObjectId(userId), roleIds);
}

/**
 * Updates an existing project user and sets their roles
 * @param projectId
 * @param userId
 * @param roles
 */
export async function updateUserRoles(projectId, userId, roles): Promise<boolean> {
    const roleIds = roles.map(id => new ObjectId(id));
    return await setUserRoles(new ObjectId(projectId), new ObjectId(userId), roleIds);
}

/**
 * Removes all access roles from a project user
 * @param projectId
 * @param userId
 */
export async function deleteUser(projectId, userId): Promise<boolean> {
    return await deleteProjectUser(new ObjectId(projectId), new ObjectId(userId));
}
