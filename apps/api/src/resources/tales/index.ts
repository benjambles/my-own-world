import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import { DataModel } from '../../app.js';
import config from './config.js';

/**
 * Routes on /tales and /tales/*
 */
export default function tales(dataModel: DataModel) {
    const tales = dataModel.get('tales');

    return createResource(config)
        .operation('getTales', async (ctx) => {
            const { limit, offset } = ctx.request.query;
            return await tales.get(limit, offset);
        })
        .operation('createTale', async (ctx) => {
            return await tales.create(ctx.request.body);
        })
        .operation('getTaleById', async (ctx) => {
            return await tales.find(ctx.request.params.taleId);
        })
        .operation('updateTaleById', async (ctx) => {
            return await tales.update(ctx.request.params.taleId, ctx.request.body);
        })
        .operation('deleteTaleById', async (ctx) => {
            return await tales.delete(ctx.request.params.taleId);
        }).middleware;
}
