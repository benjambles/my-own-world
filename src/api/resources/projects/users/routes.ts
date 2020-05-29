import Koa from 'koa';
import { generateRoute } from '../../../utils/routes/generate-route';
import { partsResponse } from '../../../utils/routes/responses';
import * as users from './users';

/**
 * Get projects, optionally filtered by parameters
 * @route [GET] /projects/:projectId/users
 */
export const getProjectUsers: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst fetching the projects user list.',
        status: 400,
    },
    async (ctx: Koa.Context): Promise<ApiResponse> => {
        const { limit = 10, offset = 0 }: dbGet = ctx.request.query;
        const { projectId } = ctx.request.params;
        const projectUsers = await users.get(projectId, limit, offset);

        return partsResponse(projectUsers);
    }
);

/**
 * Remove a users permissions from a project
 * @route [DELETE] /projects/:projectId/users
 */
export const deleteProjectUser: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst removing the user from the project',
        status: 400,
    },
    async (): Promise<ApiResponse> => partsResponse({})
);
