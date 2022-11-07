import { result } from '@benjambles/mow-server/dist/utils/db.js';
import { Order } from './orders.js';

/**
 * Retrieve a order with a matching uuid from the database
 * @param uuid - A valid uuid
 */
export async function getActiveOrderByUuid(orders, uuid: string): Promise<Order> {
    const data = await orders.findOne(
        { _id: uuid, isDeleted: false },
        { projection: { identities: 0 } },
    );

    return result('There was an error whilst fetching the order', data);
}

/**
 *
 * @param identifier
 */
export async function getActiveOrderByIdentifier(
    orders,
    identifier: string,
): Promise<Order> {
    const data = await orders.findOne({
        isDeleted: false,
        'identities.hash': { $eq: identifier },
    });

    return result('There was an error whilst fetching the order', data);
}

/**
 * Fetch a list of active orders from the database filtered by parameters
 * @param limit - The number of records to fetch
 * @param offset - The number of records to skip
 */
export async function getActiveOrders(
    orders,
    userId,
    limit: number = 10,
    skip: number = 0,
): Promise<Order[]> {
    const data = await orders
        .find(
            { isDeleted: false, userId },
            { projection: { identities: 0 }, skip, limit },
        )
        .toArray();

    return result('There was an error whilst fetching orders', data);
}

/**
 * Create a new order from validated data
 * @param data - The formatted data ready for storage
 */
export async function createOrder(orders, orderData: Order): Promise<Order> {
    const { insertedId } = await orders.insertOne(orderData);
    const data = await getActiveOrderByUuid(orders, insertedId);

    return result('There was an error whilst creating the order', data);
}

/**
 * Delete a order with a given ID
 * @param uuid - A valid uuid
 */
export async function deleteOrder(orders, uuid: string): Promise<boolean> {
    const data = await orders.findOneAndUpdate(
        { _id: uuid },
        { $set: { isDeleted: true, deletedOn: new Date() } },
        { projection: { isDeleted: 1 } },
    );

    return result('There was an error whilst updating the order', data);
}

/**
 * Updates a order record with the patch provided
 * @param uuid - A UUID representing the order profile to be updated
 * @param data - An object representing a patch on a Order profile
 */
export async function updateOrder(
    orders,
    uuid: string,
    orderData: Partial<Order>,
): Promise<Order> {
    const data = await orders.findOneAndUpdate(
        { _id: uuid },
        { $set: { orderData }, projection: { identities: 0 } },
    );

    return result('There was an error whilst updating the order', data);
}
