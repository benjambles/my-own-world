import mongoDB from 'mongodb';
import { getBasicUserDetails } from '../../users/queries.js';
import { removePassword } from '../../users/users.js';
import { deleteProjectUser, getActiveProjectUsers, setUserRoles } from './queries.js';

const { ObjectId } = mongoDB;

/**
 * Get a list of active projects
 * @param projectId - The unique identifier for the project
 * @param limit - The number of records to fetch
 * @param offset - The number of records to skip
 */
export async function get(dbInstance, projectId: string): Promise<any[]> {
    const projects = dbInstance.collection('Projects');
    const users = dbInstance.collection('Users');
    const projectUsers = await getActiveProjectUsers(projects, new ObjectId(projectId));

    return Promise.all(
        projectUsers.map(async ({ id, role }) => {
            const user = await getBasicUserDetails(users, new ObjectId(id));
            return { user: removePassword(user), role };
        }),
    );
}

/**
 * Creates a new project user and sets their roles
 * @param projectId
 * @param userId
 * @param roles
 */
export async function createUser(dbInstance, projectId, userId, roles): Promise<boolean> {
    const roleIds = roles.map((id: string) => new ObjectId(id));
    const projects = dbInstance.collection('Projects');

    return await setUserRoles(projects, new ObjectId(projectId), new ObjectId(userId), roleIds);
}

/**
 * Updates an existing project user and sets their roles
 * @param projectId
 * @param userId
 * @param roles
 */
export async function updateUserRoles(dbInstance, projectId, userId, roles): Promise<boolean> {
    const roleIds = roles.map((id: string) => new ObjectId(id));
    const projects = dbInstance.collection('Projects');

    return await setUserRoles(projects, new ObjectId(projectId), new ObjectId(userId), roleIds);
}

/**
 * Removes all access roles from a project user
 * @param projectId
 * @param userId
 */
export async function deleteUser(dbInstance, projectId, userId): Promise<boolean> {
    const projects = dbInstance.collection('Projects');

    return await deleteProjectUser(projects, new ObjectId(projectId), new ObjectId(userId));
}
