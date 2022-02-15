import { getPartsMiddleware } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { Middleware } from 'koa';
import * as users from './users.js';

/**
 * Get projects, optionally filtered by parameters
 * @route [GET] /projects/:projectId/users
 */
export function getProjectUsers(dbInstance): Middleware {
    const defaultError = {
        message: 'There was an error whilst fetching the projects user list.',
        status: 400,
    };

    return getPartsMiddleware(defaultError, async (ctx) => {
        const { projectId } = ctx.request.params;
        const projectUsers = await users.get(dbInstance, projectId);
        return projectUsers;
    });
}

/**
 * Remove a users permissions from a project
 * @route [DELETE] /projects/:projectId/users/:userId
 */
export function deleteProjectUser(dbInstance): Middleware {
    const defaultError = {
        message: 'There was an error whilst removing the user from the project',
        status: 400,
    };

    return getPartsMiddleware(defaultError, async (ctx) => {
        const { projectId, userId } = ctx.request.params;
        const userDeleted = await users.deleteUser(dbInstance, projectId, userId);

        return userDeleted;
    });
}
