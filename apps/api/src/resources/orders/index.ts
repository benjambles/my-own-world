import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import { DataModel } from '../../app.js';
import config from './config.js';

/**
 * Routes on /order and /order/*
 */
export default function order(dataModel: DataModel) {
    const orders = dataModel.get('orders');

    return createResource(config)
        .operation('getOrders', async (ctx) => {
            const { limit, offset } = ctx.request.query;

            return await orders.get(limit, offset);
        })
        .operation('createOrder', async () => {
            //const order = ctx.request.body;
            //return await orders.create(order);
        })
        .operation('getOrderById', async (ctx) => {
            return await orders.find(ctx.request.params.orderId);
        })

        .operation('updateOrderById', async (ctx) => {
            return await orders.update(ctx.request.params.orderId, {});
        })

        .operation('deleteOrderById', async (ctx) => {
            return await orders.delete(ctx.request.params.orderId);
        }).middleware;
}
