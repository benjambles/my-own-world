import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import {
    created,
    noResponse,
    ok,
} from '@benjambles/mow-server/src/utils/routes/responses.js';
import { DataModel } from '../../app.js';
import config from './config.js';

/**
 * Routes on /tales and /tales/*
 */
export default function tales(dataModel: DataModel, prefix: string) {
    const tales = dataModel.get('tales');

    return createResource(config, prefix)
        .operation('getTales', async (ctx) => {
            const { limit, offset } = ctx.request.query;
            const data = await tales.get(limit, offset);

            return ok(data);
        })
        .operation('createTale', async (ctx) => {
            const data = await tales.create(ctx.request.body);
            return created(data);
        })
        .operation('getTaleById', async (ctx) => {
            const data = await tales.find(ctx.request.params.taleId);
            return ok(data);
        })
        .operation('updateTaleById', async (ctx) => {
            const data = await tales.update(ctx.request.params.taleId, ctx.request.body);
            return ok(data);
        })
        .operation('deleteTaleById', async (ctx) => {
            await tales.delete(ctx.request.params.taleId);
            return noResponse();
        })
        .get();
}
