import * as Koa from 'koa';
import * as tales from './tales';
import { generateRoute } from '../../utils/routes/generate-route';
import { partsResponse } from '../../utils/routes/responses';

/**
 * Get tales, optionally filtered by parameters
 * @route [GET] /tales
 */
export const getTales: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst fetching tales.',
        status: 400,
    },
    async (ctx: Koa.Context): Promise<ApiResponse> => {
        const { limit = 10, offset = 0 }: dbGet = ctx.request.query;
        const talesData: Tale.TaleData[] = await tales.get(limit, offset);

        return partsResponse(talesData);
    }
);

/**
 * Create a new tale
 * @route [POST] /tales
 */
export const createTale: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst saving the tale',
        status: 400,
    },
    async (ctx: Koa.Context): Promise<ApiResponse> => {
        const tale = ctx.request.body as Tale.Request;
        const taleData: Tale.TaleData = await tales.create(tale);

        return partsResponse(taleData);
    }
);

/**
 * Get a tale and return it's data object
 * @route [GET] /tales/:taleId
 */
export const getTaleById: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst fetching the tale.',
        status: 400,
    },
    async (ctx: Koa.Context): Promise<ApiResponse> => {
        const taleData = await tales.getOne(ctx.request.params.taleId);

        return partsResponse(taleData);
    }
);

/**
 * Update a tale and return the updated data
 * @route [PUT] /tales/:taleId
 */
export const updateTaleById: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst updating the tale.',
        status: 400,
    },
    async (ctx: Koa.Context): Promise<ApiResponse> => {
        const taleUpdated = await tales.update(
            ctx.request.params.taleId,
            ctx.request.body as Tale.TaleData
        );

        return partsResponse(taleUpdated);
    }
);

/**
 * Mark a tale as deleted
 * @route [DELETE] /tales/:taleId
 */
export const deleteTaleById: Koa.Middleware = generateRoute(
    {
        message: 'There was an error whilst deleting the tale.',
        status: 400,
    },
    async (ctx: Koa.Context): Promise<ApiResponse> => {
        const taleDeleted = await tales.remove(ctx.request.params.taleId);

        return partsResponse(taleDeleted);
    }
);
