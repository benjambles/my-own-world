import { RouteHandler } from '../../../routing/spec-parsing/get-route-middleware';
import { partsResponse } from '../../../utils/routes/responses';
import * as users from './users';

/**
 * Get projects, optionally filtered by parameters
 * @route [GET] /projects/:projectId/users
 */
export const getProjectUsers: RouteHandler = (send) => {
    const defaultError = {
        message: 'There was an error whilst fetching the projects user list.',
        status: 400,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const { projectId } = ctx.request.params;
            const projectUsers = await users.get(projectId);
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
