import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import {
    created,
    noResponse,
    ok,
} from '@benjambles/mow-server/dist/utils/routes/responses.js';
import createError from 'http-errors';
import { DataModel } from '../../../app.js';
import config from './config.js';
import { cleanResponse } from './consumables.js';
/**
 * Routes on /consumables and /consumables/*
 */
export default function consumables(dataModel: DataModel) {
    const consumables = dataModel.getKey('consumables');

    return createResource(config)
        .operation('getConsumables', async (ctx) => {
            const { limit, offset } = ctx.request.query;
            const consumablesResult = await consumables.get(limit, offset);

            return ok(consumablesResult.value.map(cleanResponse));
        })
        .operation('getConsumableById', async (ctx) => {
            const consumableResult = await consumables.find(
                ctx.request.params.consumableId,
            );

            if (!consumableResult.ok) {
                throw createError(404, 'The requested consumable could not be found');
            }

            return ok(cleanResponse(consumableResult.value));
        })
        .operation('deleteConsumableById', async (ctx) => {
            const consumableResult = await consumables.delete(
                ctx.request.params.consumableId,
            );

            if (!consumableResult.ok) {
                throw createError(
                    400,
                    'There was an error whilst deleting the consumable',
                );
            }

            return noResponse();
        })
        .operation('createConsumable', async (ctx) => {
            const consumableResult = await consumables.create(ctx.request.body);

            if (!consumableResult.ok) {
                throw createError(
                    400,
                    'There was an error whilst creating the consumable',
                );
            }

            return created(cleanResponse(consumableResult.value));
        })
        .operation('updateConsumableById', async (ctx) => {
            const consumableResult = await consumables.update(
                ctx.request.params.consumableId,
                ctx.request.body,
            );

            if (!consumableResult.ok) {
                throw createError(
                    400,
                    'There was an error whilst updating the consumable',
                );
            }

            return ok(cleanResponse(consumableResult.value));
        })
        .get();
}
