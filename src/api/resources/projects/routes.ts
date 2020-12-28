import { KoaContext } from '../../../shared-server/koa/app';
import { RouteHandler } from '../../routing/spec-parsing/get-route-middleware';
import { formatData } from '../../utils/data/formatData';
import { partsResponse } from '../../utils/routes/responses';
import { getDataFormatter } from '../../utils/security/get-data-formatter';
import * as projects from './projects';

/**
 * Get projects, optionally filtered by parameters
 * @route [GET] /projects
 */
export const getProjects: RouteHandler = (send) => {
    const defaultError = {
        message: 'There was an error whilst fetching projects.',
        status: 400,
    };

    return async (ctx: KoaContext) => {
        await send(ctx, defaultError, async (ctx) => {
            const { limit = 10, offset = 0 }: DbGet = ctx.request.query;
            const projectsData: Project.ProjectData[] = await projects.get(limit, offset);

            return partsResponse(projectsData);
        });
    };
};

/**
 * Create a new project
 * @route [POST] /projects
 */
export const createProject: RouteHandler = (send) => {
    const defaultError = {
        message: 'There was an error whilst saving the project',
        status: 400,
    };

    return async (ctx: KoaContext) => {
        await send(ctx, defaultError, async (ctx) => {
            const project = ctx.request.body as Project.Request;
            const projectData: Project.ProjectData = await projects.create(
                formatData(getDataFormatter(ctx.env.ENC_SECRET, projects.model)),
                project,
            );

            return partsResponse(projectData);
        });
    };
};

/**
 * Get a project and return it's data object
 * @route [GET] /projects/:projectId
 */
export const getProjectById: RouteHandler = (send) => {
    const defaultError = {
        message: 'There was an error whilst fetching the project.',
        status: 400,
    };

    return async (ctx: KoaContext) => {
        await send(ctx, defaultError, async (ctx) => {
            const projectData = await projects.getOne(ctx.request.params.projectId);

            return partsResponse(projectData);
        });
    };
};

/**
 * Update a project and return the updated data
 * @route [PUT] /projects/:projectId
 */
export const updateProjectById: RouteHandler = (send) => {
    const defaultError = {
        message: 'There was an error whilst updating the project.',
        status: 400,
    };

    return async (ctx: KoaContext) => {
        await send(ctx, defaultError, async (ctx) => {
            const projectUpdated = await projects.update(
                formatData(getDataFormatter(ctx.env.ENC_SECRET, projects.model)),
                ctx.request.params.projectId,
                ctx.request.body as Project.ProjectData,
            );

            return partsResponse(projectUpdated);
        });
    };
};

/**
 * Mark a project as deleted
 * @route [DELETE] /projects/:projectId
 */
export const deleteProjectById: RouteHandler = (send) => {
    const defaultError = {
        message: 'There was an error whilst deleting the project.',
        status: 400,
    };

    return async (ctx: KoaContext) => {
        await send(ctx, defaultError, async (ctx) => {
            const projectDeleted = await projects.remove(ctx.request.params.projectId);

            return partsResponse(projectDeleted);
        });
    };
};
