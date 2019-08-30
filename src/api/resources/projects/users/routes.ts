import * as Koa from 'koa';
import * as users from './users';
import { generateRoute } from '../../../utils/routes/generate-route';
import { partsResponse } from '../../../utils/routes/responses';

/**
 * Get projects, optionally filtered by parameters
 * @route [GET] /projects/:projectId/users
 */
export const getProjectUsers: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst fetching the projects user list.',
        status: 400
    },
    async (ctx: Koa.Context): Promise<ApiResponse> => {
        const { limit = 10, offset = 0 }: dbGet = ctx.request.query;
        const projectId = ctx.request.params.projectId;
        const projectUsers = await users.get(projectId, limit, offset);

        return partsResponse(projectUsers);
    }
);
