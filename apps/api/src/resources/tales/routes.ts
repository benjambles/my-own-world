import { paramToNumber } from '@benjambles/mow-server/dist/utils/data/param-to-number.js';
import { getPartsMiddleware } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { DataModel } from '../../app.js';
import { Tale, TaleData } from './queries.js';

export function taleRoutes(dataModel: DataModel) {
    const tales = dataModel.get('tales');

    return {
        /**
         * Get tales, optionally filtered by parameters
         * @route [GET] /tales
         */
        getTales: getPartsMiddleware(
            'There was an error whilst fetching tales.',
            async (ctx) => {
                const { limit, offset } = ctx.request.query;
                return await tales.get(
                    paramToNumber(limit, 10),
                    paramToNumber(offset, 0),
                );
            },
        ),
        /**
         * Create a new tale
         * @route [POST] /tales
         */
        createTale: getPartsMiddleware(
            'There was an error whilst saving the tale',
            async (ctx) => {
                const tale = ctx.request.body as Tale;
                return await tales.create(tale);
            },
        ),

        /**
         * Get a tale and return it's data object
         * @route [GET] /tales/:taleId
         */
        getTaleById: getPartsMiddleware(
            'There was an error whilst fetching the tale.',
            async (ctx) => {
                return await tales.find(ctx.request.params.taleId);
            },
        ),

        /**
         * Update a tale and return the updated data
         * @route [PUT] /tales/:taleId
         */
        updateTaleById: getPartsMiddleware(
            'There was an error whilst updating the tale.',
            async (ctx) => {
                return await tales.update(
                    ctx.request.params.taleId,
                    ctx.request.body as TaleData,
                );
            },
        ),

        /**
         * Mark a tale as deleted
         * @route [DELETE] /tales/:taleId
         */
        deleteTaleById: getPartsMiddleware(
            'There was an error whilst deleting the tale.',
            async (ctx) => {
                return await tales.delete(ctx.request.params.taleId);
            },
        ),
    };
}
