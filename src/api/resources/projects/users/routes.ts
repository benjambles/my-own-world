import Koa from 'koa';
import { KoaContext } from '../../../../shared-server/koa/app';
import { generateRoute } from '../../../utils/routes/generate-route';
import { PartsResponse, partsResponse } from '../../../utils/routes/responses';
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
    async (ctx: KoaContext): Promise<PartsResponse> => {
        const { projectId } = ctx.request.params;
        const projectUsers = await users.get(projectId);

        return partsResponse(projectUsers);
    },
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
    async (): Promise<PartsResponse> => partsResponse({}),
);
