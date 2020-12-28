import { RouteHandler } from '../../routing/spec-parsing/get-route-middleware';
import { formatData } from '../../utils/data/formatData';
import { partsResponse } from '../../utils/routes/responses';
import { getDataFormatter } from '../../utils/security/get-data-formatter';
import * as tales from './tales';

/**
 * Get tales, optionally filtered by parameters
 * @route [GET] /tales
 */
export const getTales: RouteHandler = (send) => {
    const defaultError = {
        message: 'There was an error whilst fetching tales.',
        status: 400,
    };
    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const { limit = 10, offset = 0 }: DbGet = ctx.request.query;
            const talesData: Tale.TaleData[] = await tales.get(limit, offset);

            return partsResponse(talesData);
        });
    };
};

/**
 * Create a new tale
 * @route [POST] /tales
 */
export const createTale: RouteHandler = (send) => {
    const defaultError = {
        message: 'There was an error whilst saving the tale',
        status: 400,
    };
    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const tale = ctx.request.body as Tale.Request;
            const taleData: Tale.TaleData = await tales.create(
                formatData(getDataFormatter(ctx.env.ENC_SECRET, tales.model)),
                tale,
            );

            return partsResponse(taleData);
        });
    };
};

/**
 * Get a tale and return it's data object
 * @route [GET] /tales/:taleId
 */
export const getTaleById: RouteHandler = (send) => {
    const defaultError = {
        message: 'There was an error whilst fetching the tale.',
        status: 400,
    };
    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const taleData = await tales.getOne(ctx.request.params.taleId);

            return partsResponse(taleData);
        });
    };
};

/**
 * Update a tale and return the updated data
 * @route [PUT] /tales/:taleId
 */
export const updateTaleById: RouteHandler = (send) => {
    const defaultError = {
        message: 'There was an error whilst updating the tale.',
        status: 400,
    };
    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const taleUpdated = await tales.update(
                formatData(getDataFormatter(ctx.env.ENC_SECRET, tales.model)),
                ctx.request.params.taleId,
                ctx.request.body as Tale.TaleData,
            );

            return partsResponse(taleUpdated);
        });
    };
};

/**
 * Mark a tale as deleted
 * @route [DELETE] /tales/:taleId
 */
export const deleteTaleById: RouteHandler = (send) => {
    const defaultError = {
        message: 'There was an error whilst deleting the tale.',
        status: 400,
    };
    return async (ctx) => {
        await send(ctx, defaultError, async (ctx) => {
            const taleDeleted = await tales.remove(ctx.request.params.taleId);

            return partsResponse(taleDeleted);
        });
    };
};
