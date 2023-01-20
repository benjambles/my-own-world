import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import {
    created,
    noResponse,
    ok,
} from '@benjambles/mow-server/src/utils/routes/responses.js';
import { DataModel } from '../../app.js';
import config from './config.js';

/**
 * Routes on /order and /order/*
 */
export default function order(dataModel: DataModel, prefix: string) {
    const orders = dataModel.get('orders');

    return createResource(config, prefix)
        .operation('getOrders', async (ctx) => {
            const { limit, offset } = ctx.request.query;
            const data = await orders.get(limit, offset);

            return ok(data);
        })
        .operation('createOrder', async (ctx) => {
            const order = ctx.request.body;
            const data = await orders.create(order);

            return created(data);
        })
        .operation('getOrderById', async (ctx) => {
            const data = await orders.find(ctx.request.params.orderId);

            return ok(data);
        })

        .operation('updateOrderById', async (ctx) => {
            const data = await orders.update(
                ctx.request.params.orderId,
                ctx.request.body,
            );

            return ok(data);
        })

        .operation('deleteOrderById', async (ctx) => {
            await orders.delete(ctx.request.params.orderId);

            return noResponse();
        })
        .get();
}
