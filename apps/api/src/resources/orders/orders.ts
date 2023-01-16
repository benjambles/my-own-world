import {
    formatData,
    getDataFormatter,
    ModelOptions,
} from '@benjambles/mow-server/dist/utils/data/index.js';
import { Db } from 'mongodb';
import { Env } from '../../schema/env-schema.js';
import { getOrderHelpers, Order } from './queries.js';

export function getOrderModel(db: Db, { ENC_SECRET }: Env) {
    const formatOptions: ModelOptions = {
        encrypted: [],
        salted: [],
        readOnly: ['_id'],
        hmac: [],
    };

    const formatOrderData = formatData(getDataFormatter(ENC_SECRET, formatOptions));
    const orderQueries = getOrderHelpers(db);

    return {
        /**
         *
         * @param dbInstance
         * @param userId
         * @param limit
         * @param offset
         */
        get: async function getOrders(
            limit: number = 10,
            offset: number = 0,
        ): Promise<Order[]> {
            return await orderQueries.get(limit, offset);
        },

        /**
         *
         * @param dbInstance
         * @param uuid
         */
        find: async function getOrderByUuid(uuid: string): Promise<Order> {
            return await orderQueries.find(uuid);
        },

        /**
         * Creates a new user record in the database
         * @param data - The fields required to create a new user record
         */
        create: async function create(data: Order): Promise<Order> {
            const cleanData = await formatOrderData(data);
            return await orderQueries.create({
                ...cleanData,
                statusLog: [
                    {
                        state: 'created',
                        date: new Date(),
                    },
                ],
            });
        },

        /**
         * Updates an order  in the database
         * @param uuid - The UUID for the order to be updated
         * @param data - An object representing a portion of a order object
         */
        update: async function updateOrder(
            uuid: string,
            data: Partial<Order>,
        ): Promise<Order> {
            const cleanData = await formatOrderData(data);
            return await orderQueries.update(uuid, cleanData);
        },

        /**
         * Mark an order as cancelled
         * @param uuid - The UUID of the order
         */
        delete: async function deleteOrder(uuid: string): Promise<boolean> {
            // TODO mark payment as cancelled and update provider
            return await orderQueries.delete(uuid);
        },
    };
}
