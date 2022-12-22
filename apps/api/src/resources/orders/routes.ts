import {
    formatData,
    getDataFormatter,
} from '@benjambles/mow-server/dist/utils/data/index.js';
import { paramToNumber } from '@benjambles/mow-server/dist/utils/data/param-to-number.js';
import { getPartsMiddleware } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { Middleware } from 'koa';
import * as orders from './orders.js';

/**
 * Retrieve a list of all of the orders on the system
 * @route [Get] /orders
 */
export function getOrders(dbInstance): Middleware {
    const defaultError = {
        message: 'Sorry there was an error whilst fetching the orders',
        status: 400,
    };

    return getPartsMiddleware(defaultError, async (ctx) => {
        const { limit, offset, userId } = ctx.request.query;
        const ordersData: orders.Order[] = await orders.get(
            dbInstance,
            userId,
            paramToNumber(limit, 10),
            paramToNumber(offset, 0),
        );

        return ordersData;
    });
}

/**
 * Create a new order
 * @route [POST] /orders
 */
export function createOrder(dbInstance): Middleware {
    const defaultError = {
        message: 'Sorry there was an error whilst creating the order',
        status: 400,
    };

    return getPartsMiddleware(defaultError, async (ctx) => {
        const order = ctx.request.body;
        const orderData: orders.Order = await orders.create(
            dbInstance,
            formatData(getDataFormatter(ctx.env.ENC_SECRET, orders.model)),
            order,
        );

        return orderData;
    });
}

/**
 * Get a order and return it's data object
 * @route [GET] /orders/:orderId
 */
export function getOrderById(dbInstance): Middleware {
    const defaultError = {
        message: 'Sorry there was an error whilst fetching the order',
        status: 400,
    };

    return getPartsMiddleware(defaultError, async (ctx) => {
        const ordersData: orders.Order = await orders.getOne(
            dbInstance,
            ctx.request.params.orderId,
        );

        return ordersData;
    });
}
