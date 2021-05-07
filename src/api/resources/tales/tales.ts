import mongoDB from 'mongodb';
import * as queries from './queries.js';

const { ObjectId } = mongoDB;

export const model = {
    readOnly: ['uuid'],
};

/**
 * Get a list of active tales
 * @param limit - The number of records to fetch
 * @param offset - The number of records to skip
 */
export const get = async (
    dbInstance,
    limit: number = 10,
    offset: number = 0,
): Promise<Tale.TaleData[]> => {
    const tales = dbInstance.collection('Tales');

    return await queries.getActiveTales(tales, limit, offset);
};

/**
 * Fetches a tale record from the database using the uuid as the search value
 * @param uuid - A valid uuid
 */
export const getOne = async (dbInstance, uuid: string): Promise<Tale.TaleData> => {
    const tales = dbInstance.collection('Tales');

    return await queries.getActiveTaleByUuid(tales, new ObjectId(uuid));
};

/**
 * Creates a new tale record in the database
 * @param data - The fields required to create a new tale record
 */
export const create = async (dbInstance, formatter, data: Tale.Request): Promise<Tale.TaleData> => {
    const tales = dbInstance.collection('Tales');
    const cleanData = await (<Tale.TaleData>formatter(data));

    return await queries.createTale(tales, cleanData);
};

/**
 * Updates a tales profile data in the database
 * @param uuid - The UUID for the tale to be updated
 * @param data - An object representing a portion of a tale object
 */
export const update = async (
    dbInstance,
    formatter,
    uuid: string,
    data: Tale.Request,
): Promise<Tale.TaleData> => {
    const tales = dbInstance.collection('Tales');
    const cleanData = await (<Tale.TaleData>formatter(data));

    return await queries.updateTale(tales, new ObjectId(uuid), cleanData);
};

/**
 * Mark a tale as inactive
 * @param uuid - The UUID of the tale
 */
export const remove = async (dbInstance, uuid: string): Promise<boolean> => {
    const tales = dbInstance.collection('Tales');

    return await queries.deleteTale(tales, new ObjectId(uuid));
};
