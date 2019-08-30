import ObjectId from 'mongodb';
import { withCollection, result } from '../../../db';

const projects = withCollection('projects');

export async function getActiveProjectUsers(
    uuid: ObjectId,
    limit: number,
    skip: number
): Promise<any> {
    const data = await projects.findOne(
        {
            uuid,
            isDeleted: false,
            'users.roles': { $ne: null }
        },
        { projection: { users: 1 } }
    );

    return result('There was an error whilst fetching the projects users', data);
}

export async function setUserRoles(
    projectId: ObjectId,
    userId: ObjectId,
    roles: ObjectId[]
): Promise<boolean> {
    const data = await projects.findAndModify({
        query: {
            projectId,
            isDeleted: false
        },
        update: { $set: { 'users.$[elem]': { uuid: userId, roles } } },
        arrayFilters: [{ 'elem.uuid': { $eq: userId } }],
        new: true
    });

    return result('There was an error updating the user roles', data);
}

export async function deleteProjectUser(projectId: ObjectId, userId: ObjectId): Promise<boolean> {
    const data = await projects.findAndModify({
        query: {
            projectId,
            isDeleted: false,
            'users.uuid': userId
        },
        update: { $set: { 'users.$[elem].roles': null } },
        arrayFilters: [{ 'elem.uuid': { $eq: userId } }],
        new: true
    });

    return result('There was an error whilst removing the user roles', data);
}
