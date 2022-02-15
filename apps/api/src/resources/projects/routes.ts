import { formatData, getDataFormatter } from '@benjambles/mow-server/dist/utils/data/index.js';
import { paramToNumber } from '@benjambles/mow-server/dist/utils/data/param-to-number.js';
import { getPartsMiddleware } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { Middleware } from 'koa';
import * as projects from './projects.js';

/**
 * Get projects, optionally filtered by parameters
 * @route [GET] /projects
 */
export function getProjects(dbInstance): Middleware {
    const defaultError = {
        message: 'There was an error whilst fetching projects.',
        status: 400,
    };

    return getPartsMiddleware(defaultError, async (ctx) => {
        const { limit, offset } = ctx.request.query;
        const projectsData: Project.ProjectData[] = await projects.get(
            dbInstance,
            paramToNumber(limit, 10),
            paramToNumber(offset, 0),
        );

        return projectsData;
    });
}

/**
 * Create a new project
 * @route [POST] /projects
 */
export function createProject(dbInstance): Middleware {
    const defaultError = {
        message: 'There was an error whilst saving the project',
        status: 400,
    };

    return getPartsMiddleware(defaultError, async (ctx) => {
        const project = ctx.request.body as Project.Request;
        const projectData: Project.ProjectData = await projects.create(
            dbInstance,
            formatData(getDataFormatter(ctx.env.ENC_SECRET, projects.model)),
            project,
        );

        return projectData;
    });
}

/**
 * Get a project and return it's data object
 * @route [GET] /projects/:projectId
 */
export function getProjectById(dbInstance): Middleware {
    const defaultError = {
        message: 'There was an error whilst fetching the project.',
        status: 400,
    };

    return getPartsMiddleware(defaultError, async (ctx) => {
        const projectData = await projects.getOne(dbInstance, ctx.request.params.projectId);

        return projectData;
    });
}

/**
 * Update a project and return the updated data
 * @route [PUT] /projects/:projectId
 */
export function updateProjectById(dbInstance): Middleware {
    const defaultError = {
        message: 'There was an error whilst updating the project.',
        status: 400,
    };

    return getPartsMiddleware(defaultError, async (ctx) => {
        const projectUpdated = await projects.update(
            dbInstance,
            formatData(getDataFormatter(ctx.env.ENC_SECRET, projects.model)),
            ctx.request.params.projectId,
            ctx.request.body as Project.ProjectData,
        );

        return projectUpdated;
    });
}

/**
 * Mark a project as deleted
 * @route [DELETE] /projects/:projectId
 */
export function deleteProjectById(dbInstance): Middleware {
    const defaultError = {
        message: 'There was an error whilst deleting the project.',
        status: 400,
    };

    return getPartsMiddleware(defaultError, async (ctx) => {
        const projectDeleted = await projects.remove(dbInstance, ctx.request.params.projectId);

        return projectDeleted;
    });
}
