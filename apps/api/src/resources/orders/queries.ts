import { getObjectId, result } from '@benjambles/mow-server/dist/utils/db.js';
import { Db, ObjectId } from 'mongodb';

//#region Types
export interface Order {
    _id: ObjectId;
    customerId: string;
    paymentId: string;
    items: OrderProduct[];
    currency: string;
    discountCode: string;
    statusLog: Status[];
}

interface Status {
    state: string;
    date: Date;
}

export interface OrderProduct {
    _id: ObjectId;
    name: string;
    price: number;
    discount: number;
    pretaxTotal: number;
    tax: number;
    total: number;
}

export interface Payment {
    _id: ObjectId;
    userId: string;
    status: string;
    provider_reference: string;
    gateway: string;
    type: string;
    value: number;
    card: {
        brand: string;
        panLastFour: string;
        expires: {
            month: number;
            year: number;
        };
        cvvVerified: boolean;
    };
    statusLog: Status[];
}
//#endregion Types

export function getOrderHelpers(db: Db) {
    const orders = db.collection<Order>('Orders');

    const helpers = {
        /**
         * Retrieve a order with a matching uuid from the database
         * @param uuid - A valid uuid
         */
        find: async function getActiveOrderByUuid(uuid): Promise<Order> {
            const data = await orders.findOne({
                _id: getObjectId(uuid),
                isDeleted: false,
            });

            return result('There was an error whilst fetching the order', data);
        },

        /**
         * Fetch a list of active orders from the database filtered by parameters
         * @param limit - The number of records to fetch
         * @param offset - The number of records to skip
         */
        get: async function getActiveOrders(
            limit: number = 10,
            skip: number = 0,
        ): Promise<Order[]> {
            const data = await orders
                .find({ isDeleted: false }, { skip, limit })
                .toArray();

            return result('There was an error whilst fetching orders', data);
        },

        /**
         * Create a new order from validated data
         * @param data - The formatted data ready for storage
         */
        create: async function createOrder(orderData: Order): Promise<Order> {
            const { insertedId } = await orders.insertOne(orderData);
            const data = await helpers.find(insertedId);

            return result('There was an error whilst creating the order', data);
        },

        /**
         * Delete a order with a given ID
         * @param uuid - A valid uuid
         */
        delete: async function deleteOrder(uuid: string): Promise<boolean> {
            const data = await orders.findOneAndUpdate(
                { _id: getObjectId(uuid) },
                { $set: { isDeleted: true, deletedOn: new Date() } },
                { projection: { isDeleted: 1 } },
            );

            return result('There was an error whilst updating the order', data.ok !== 0);
        },

        /**
         * Updates a order record with the patch provided
         * @param uuid - A UUID representing the order profile to be updated
         * @param data - An object representing a patch on a Order profile
         */
        update: async function updateOrder(
            uuid,
            orderData: Partial<Order>,
        ): Promise<Order> {
            const data = await orders.findOneAndUpdate(
                { _id: getObjectId(uuid) },
                { $set: { orderData } },
            );

            return result('There was an error whilst updating the order', data.value);
        },
    };

    return helpers;
}
