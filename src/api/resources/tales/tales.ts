import ObjectId from 'mongodb';
import * as db from './queries';

export const model = {
    readOnly: ['uuid'],
};

/**
 * Get a list of active tales
 * @param limit - The number of records to fetch
 * @param offset - The number of records to skip
 */
export const get = async (limit: number = 10, offset: number = 0): Promise<Tale.TaleData[]> => {
    return await db.getActiveTales(limit, offset);
};

/**
 * Fetches a tale record from the database using the uuid as the search value
 * @param uuid - A valid uuid
 */
export const getOne = async (uuid: string): Promise<Tale.TaleData> => {
    return await db.getActiveTaleByUuid(new ObjectId(uuid));
};

/**
 * Creates a new tale record in the database
 * @param data - The fields required to create a new tale record
 */
export const create = async (formatter, data: Tale.Request): Promise<Tale.TaleData> => {
    const cleanData = await (<Tale.TaleData>formatter(data));

    return await db.createTale(cleanData);
};

/**
 * Updates a tales profile data in the database
 * @param uuid - The UUID for the tale to be updated
 * @param data - An object representing a portion of a tale object
 */
export const update = async (
    formatter,
    uuid: string,
    data: Tale.Request,
): Promise<Tale.TaleData> => {
    const cleanData = await (<Tale.TaleData>formatter(data));

    return await db.updateTale(new ObjectId(uuid), cleanData);
};

/**
 * Mark a tale as inactive
 * @param uuid - The UUID of the tale
 */
export const remove = async (uuid: string): Promise<boolean> => {
    return await db.deleteTale(new ObjectId(uuid));
};
