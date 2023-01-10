import { paramToNumber } from '@benjambles/mow-server/dist/utils/data/param-to-number.js';
import { getPartsMiddleware } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { DataModel } from '../../app.js';

export function orderRoutes(dataModel: DataModel) {
    const orders = dataModel.get('orders');

    return {
        /**
         * Retrieve a list of all of the orders on the system
         * @route [Get] /orders
         */
        getOrders: getPartsMiddleware(
            'Sorry there was an error whilst fetching the orders',
            async (ctx) => {
                const { limit, offset, userId } = ctx.request.query;

                return await orders.get(
                    Array.isArray(userId) ? userId[0] : userId,
                    paramToNumber(limit, 10),
                    paramToNumber(offset, 0),
                );
            },
        ),

        /**
         * Create a new order
         * @route [POST] /orders
         */
        createOrder: getPartsMiddleware(
            'Sorry there was an error whilst creating the order',
            async (ctx) => {
                const order = ctx.request.body;
                return await orders.create(order);
            },
        ),

        /**
         * Get a order and return it's data object
         * @route [GET] /orders/:orderId
         */
        getOrderById: getPartsMiddleware(
            'Sorry there was an error whilst fetching the order',
            async (ctx) => {
                return await orders.find(ctx.request.params.orderId);
            },
        ),

        updateOrderById: getPartsMiddleware(
            'Sorry there was an error whilst updating the order',
            async (ctx) => {
                return await orders.update(ctx.request.params.orderId, {});
            },
        ),

        deleteOrderById: getPartsMiddleware(
            'Sorry there was an error whilst deleting the order',
            async (ctx) => {
                return await orders.delete(ctx.request.params.orderId);
            },
        ),
    };
}
