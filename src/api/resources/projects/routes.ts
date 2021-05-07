import { RouteHandler } from '../../routing/spec-parsing/get-route-middleware.js';
import { formatData } from '../../utils/data/formatData.js';
import { partsResponse } from '../../utils/routes/responses.js';
import { getDataFormatter } from '../../utils/security/get-data-formatter.js';
import * as projects from './projects.js';

/**
 * Get projects, optionally filtered by parameters
 * @route [GET] /projects
 */
export const getProjects: RouteHandler = (send, dbInstance) => {
    const defaultError = {
        message: 'There was an error whilst fetching projects.',
        status: 400,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const { limit = 10, offset = 0 }: DbGet = ctx.request.query;
            const projectsData: Project.ProjectData[] = await projects.get(
                dbInstance,
                limit,
                offset,
            );

            return partsResponse(projectsData);
        });
    };
};

/**
 * Create a new project
 * @route [POST] /projects
 */
export const createProject: RouteHandler = (send, dbInstance) => {
    const defaultError = {
        message: 'There was an error whilst saving the project',
        status: 400,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const project = ctx.request.body as Project.Request;
            const projectData: Project.ProjectData = await projects.create(
                dbInstance,
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
export const getProjectById: RouteHandler = (send, dbInstance) => {
    const defaultError = {
        message: 'There was an error whilst fetching the project.',
        status: 400,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const projectData = await projects.getOne(dbInstance, ctx.request.params.projectId);

            return partsResponse(projectData);
        });
    };
};

/**
 * Update a project and return the updated data
 * @route [PUT] /projects/:projectId
 */
export const updateProjectById: RouteHandler = (send, dbInstance) => {
    const defaultError = {
        message: 'There was an error whilst updating the project.',
        status: 400,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const projectUpdated = await projects.update(
                dbInstance,
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
export const deleteProjectById: RouteHandler = (send, dbInstance) => {
    const defaultError = {
        message: 'There was an error whilst deleting the project.',
        status: 400,
    };

    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const projectDeleted = await projects.remove(dbInstance, ctx.request.params.projectId);

            return partsResponse(projectDeleted);
        });
    };
};
