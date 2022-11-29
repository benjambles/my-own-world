import mongoDB from 'mongodb';
import * as queries from './queries.js';

const { ObjectId } = mongoDB;

export const model = {
    readOnly: ['_id'],
};

export interface Order {
    _id: string;
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
    _id: string;
    name: string;
    price: number;
    discount: number;
    pretaxTotal: number;
    tax: number;
    total: number;
}

export interface Payment {
    _id: string;
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

/**
 *
 * @param dbInstance
 * @param userId
 * @param limit
 * @param offset
 */
export async function get(
    dbInstance,
    userId: string,
    limit: number = 10,
    offset: number = 0,
): Promise<Order[]> {
    const orders = dbInstance.collection('Orders');
    const orderDetails = await queries.getActiveOrders(orders, userId, limit, offset);

    return orderDetails;
}

/**
 *
 * @param dbInstance
 * @param uuid
 */
export async function getOne(dbInstance, uuid: string): Promise<Order> {
    const orders = dbInstance.collection('Orders');
    const order = await queries.getActiveOrderByUuid(orders, new ObjectId(uuid));

    return order;
}

/**
 * Creates a new user record in the database
 * @param data - The fields required to create a new user record
 */
export async function create(dbInstance, formatter, data: Order): Promise<Order> {
    const cleanData = await formatter(data);
    const orders = dbInstance.collection('Orders');
    const order = await queries.createOrder(orders, {
        ...cleanData,
        statusLog: [
            {
                status: 'created',
                date: new Date(),
            },
        ],
    });

    return order;
}

/**
 * Updates an order  in the database
 * @param uuid - The UUID for the order to be updated
 * @param data - An object representing a portion of a order object
 */
export async function update(
    dbInstance,
    formatter,
    uuid: string,
    data: Partial<Order>,
): Promise<Order> {
    const cleanData = await formatter(data);
    const orders = dbInstance.collection('Orders');
    const order = await queries.updateOrder(orders, new ObjectId(uuid), cleanData);

    return order;
}

/**
 * Mark an order as cancelled
 * @param uuid - The UUID of the order
 */
export async function remove(dbInstance, uuid: string): Promise<boolean> {
    const orders = dbInstance.collection('Orders');

    // TODO mark payment as cancelled and update provider
    return await queries.deleteOrder(orders, new ObjectId(uuid));
}
