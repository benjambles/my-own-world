import * as Koa from 'koa';
import * as projects from './projects';
import { generateRoute } from '../../utils/routes';
import { partsResponse } from '../../utils/routes/responses';

/**
 * Get projects, optionally filtered by parameters
 * @route [GET] /projects
 */
export const getProjects: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst fetching projects.',
        status: 400
    },
    async (ctx: Koa.Context): Promise<ApiResponse> => {
        const { limit = 10, offset = 0 }: dbGet = ctx.request.query;
        const projectsData: Project.ProjectData[] = await projects.get(limit, offset);

        return partsResponse(projectsData);
    }
);

/**
 * Create a new project
 * @route [POST] /projects
 */
export const createProject: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst saving the project',
        status: 400
    },
    async (ctx: Koa.Context): Promise<ApiResponse> => {
        const project = ctx.request.body as Project.Request;
        const projectData: Project.ProjectData = await projects.create(project);

        return partsResponse(projectData);
    }
);

/**
 * Get a project and return it's data object
 * @route [GET] /projects/:projectId
 */
export const getProjectById: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst fetching the project.',
        status: 400
    },
    async (ctx: Koa.Context): Promise<ApiResponse> => {
        const projectData = await projects.getOne(ctx.request.params.projectId);

        return partsResponse(projectData);
    }
);

/**
 * Update a project and return the updated data
 * @route [PUT] /projects/:projectId
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 */
export const updateProjectById: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst updating the project.',
        status: 400
    },
    async (ctx: Koa.Context): Promise<ApiResponse> => {
        const projectUpdated = await projects.update(ctx.request.params.projectId, ctx.request
            .body as Project.ProjectData);
        return partsResponse(projectUpdated);
    }
);

/**
 * Mark a project as deleted
 * @route [DELETE] /projects/:projectId
 */
export const deleteProjectById: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst deleting the project.',
        status: 400
    },
    async (ctx: Koa.Context): Promise<ApiResponse> => {
        const projectDeleted = await projects.remove(ctx.request.params.projectId);
        return partsResponse(projectDeleted);
    }
);
