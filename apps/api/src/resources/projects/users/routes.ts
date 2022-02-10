import { Middleware } from 'koa';
import { partsResponse } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { Send } from '@benjambles/mow-server/dist/utils/routes/send.js';
import * as users from './users.js';

/**
 * Get projects, optionally filtered by parameters
 * @route [GET] /projects/:projectId/users
 */
export function getProjectUsers(send: Send, dbInstance): Middleware {
    const defaultError = {
        message: 'There was an error whilst fetching the projects user list.',
        status: 400,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const { projectId } = ctx.request.params;
            const projectUsers = await users.get(dbInstance, projectId);
            return partsResponse(projectUsers);
        });
    };
}

/**
 * Remove a users permissions from a project
 * @route [DELETE] /projects/:projectId/users
 */
export function deleteProjectUser(send: Send): Middleware {
    const defaultError = {
        message: 'There was an error whilst removing the user from the project',
        status: 400,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async () => partsResponse());
    };
}
