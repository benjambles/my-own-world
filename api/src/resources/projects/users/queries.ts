import ObjectId from 'mongodb';
import { result, withCollection } from '../../../db';

const projects = withCollection('projects');

/**
 *
 * @param uuid
 */
export const getActiveProjectUsers = async (uuid: ObjectId): Promise<any> => {
    const data = await projects.findOne(
        {
            uuid,
            isDeleted: false,
            'users.roles': { $ne: null },
        },
        { projection: { users: 1 } }
    );

    return result('There was an error whilst fetching the projects users', data);
};

/**
 *
 * @param projectId
 * @param userId
 * @param roles
 */
export const setUserRoles = async (
    projectId: ObjectId,
    userId: ObjectId,
    roles: ObjectId[]
): Promise<boolean> => {
    const data = await projects.findAndModify({
        query: {
            projectId,
            isDeleted: false,
        },
        update: { $set: { 'users.$[elem]': { uuid: userId, roles } } },
        arrayFilters: [{ 'elem.uuid': { $eq: userId } }],
        new: true,
    });

    return result('There was an error updating the user roles', data);
};

/**
 *
 * @param projectId
 * @param userId
 */
export const deleteProjectUser = async (
    projectId: ObjectId,
    userId: ObjectId
): Promise<boolean> => {
    const data = await projects.findAndModify({
        query: {
            projectId,
            isDeleted: false,
            'users.uuid': userId,
        },
        update: { $set: { 'users.$[elem].roles': null } },
        arrayFilters: [{ 'elem.uuid': { $eq: userId } }],
        new: true,
    });

    return result('There was an error whilst removing the user roles', data);
};
