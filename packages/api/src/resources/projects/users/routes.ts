import { RouteHandler } from '../../../routing/spec-parsing/get-route-middleware.js';
import { partsResponse } from '../../../utils/routes/responses.js';
import * as users from './users.js';

/**
 * Get projects, optionally filtered by parameters
 * @route [GET] /projects/:projectId/users
 */
export const getProjectUsers: RouteHandler = (send, dbInstance) => {
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
};

/**
 * Remove a users permissions from a project
 * @route [DELETE] /projects/:projectId/users
 */
export const deleteProjectUser: RouteHandler = (send) => {
    const defaultError = {
        message: 'There was an error whilst removing the user from the project',
        status: 400,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async () => partsResponse());
    };
};
