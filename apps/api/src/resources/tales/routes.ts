import { formatData, getDataFormatter } from '@benjambles/mow-server/dist/utils/data/index.js';
import { paramToNumber } from '@benjambles/mow-server/dist/utils/data/param-to-number.js';
import { getPartsMiddleware } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { Middleware } from 'koa';
import * as tales from './tales.js';

/**
 * Get tales, optionally filtered by parameters
 * @route [GET] /tales
 */
export function getTales(dbInstance): Middleware {
    const defaultError = {
        message: 'There was an error whilst fetching tales.',
        status: 400,
    };
    return getPartsMiddleware(defaultError, async (ctx) => {
        const { limit, offset } = ctx.request.query;
        const talesData: Tale.TaleData[] = await tales.get(
            dbInstance,
            paramToNumber(limit, 10),
            paramToNumber(offset, 0),
        );

        return talesData;
    });
}

/**
 * Create a new tale
 * @route [POST] /tales
 */
export function createTale(dbInstance): Middleware {
    const defaultError = {
        message: 'There was an error whilst saving the tale',
        status: 400,
    };
    return getPartsMiddleware(defaultError, async (ctx) => {
        const tale = ctx.request.body as Tale.Request;
        const taleData: Tale.TaleData = await tales.create(
            dbInstance,
            formatData(getDataFormatter(ctx.env.ENC_SECRET, tales.model)),
            tale,
        );

        return taleData;
    });
}

/**
 * Get a tale and return it's data object
 * @route [GET] /tales/:taleId
 */
export function getTaleById(dbInstance): Middleware {
    const defaultError = {
        message: 'There was an error whilst fetching the tale.',
        status: 400,
    };
    return getPartsMiddleware(defaultError, async (ctx) => {
        const taleData = await tales.getOne(dbInstance, ctx.request.params.taleId);

        return taleData;
    });
}

/**
 * Update a tale and return the updated data
 * @route [PUT] /tales/:taleId
 */
export function updateTaleById(dbInstance): Middleware {
    const defaultError = {
        message: 'There was an error whilst updating the tale.',
        status: 400,
    };
    return getPartsMiddleware(defaultError, async (ctx) => {
        const taleUpdated = await tales.update(
            dbInstance,
            formatData(getDataFormatter(ctx.env.ENC_SECRET, tales.model)),
            ctx.request.params.taleId,
            ctx.request.body as Tale.TaleData,
        );

        return taleUpdated;
    });
}

/**
 * Mark a tale as deleted
 * @route [DELETE] /tales/:taleId
 */
export function deleteTaleById(dbInstance): Middleware {
    const defaultError = {
        message: 'There was an error whilst deleting the tale.',
        status: 400,
    };
    return getPartsMiddleware(defaultError, async (ctx) => {
        const taleDeleted = await tales.remove(dbInstance, ctx.request.params.taleId);

        return taleDeleted;
    });
}
