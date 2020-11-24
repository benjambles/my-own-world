import Koa from 'koa';
import { KoaContext } from '../../../shared-server/koa/app';
import { generateRoute } from '../../utils/routes/generate-route';
import { PartsResponse, partsResponse } from '../../utils/routes/responses';
import * as projects from './projects';

/**
 * Get projects, optionally filtered by parameters
 * @route [GET] /projects
 */
export const getProjects: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst fetching projects.',
        status: 400,
    },
    async (ctx: KoaContext): Promise<PartsResponse> => {
        const { limit = 10, offset = 0 }: DbGet = ctx.request.query;
        const projectsData: Project.ProjectData[] = await projects.get(limit, offset);

        return partsResponse(projectsData);
    },
);

/**
 * Create a new project
 * @route [POST] /projects
 */
export const createProject: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst saving the project',
        status: 400,
    },
    async (ctx: KoaContext): Promise<PartsResponse> => {
        const project = ctx.request.body as Project.Request;
        const projectData: Project.ProjectData = await projects.create(project);

        return partsResponse(projectData);
    },
);

/**
 * Get a project and return it's data object
 * @route [GET] /projects/:projectId
 */
export const getProjectById: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst fetching the project.',
        status: 400,
    },
    async (ctx: KoaContext): Promise<PartsResponse> => {
        const projectData = await projects.getOne(ctx.request.params.projectId);

        return partsResponse(projectData);
    },
);

/**
 * Update a project and return the updated data
 * @route [PUT] /projects/:projectId
 */
export const updateProjectById: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst updating the project.',
        status: 400,
    },
    async (ctx: KoaContext): Promise<PartsResponse> => {
        const projectUpdated = await projects.update(
            ctx.request.params.projectId,
            ctx.request.body as Project.ProjectData,
        );

        return partsResponse(projectUpdated);
    },
);

/**
 * Mark a project as deleted
 * @route [DELETE] /projects/:projectId
 */
export const deleteProjectById: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst deleting the project.',
        status: 400,
    },
    async (ctx: KoaContext): Promise<PartsResponse> => {
        const projectDeleted = await projects.remove(ctx.request.params.projectId);

        return partsResponse(projectDeleted);
    },
);
