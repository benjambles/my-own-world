import ObjectId from 'mongodb';
import formatter from '../../utils/data/formatter';
import * as db from './queries';

const format = {
    readOnly: ['uuid']
};

/**
 * Prepares a tale object for database insertion
 */
const cleanTaleData = formatter(format);

/**
 * Get a list of active tales
 * @param limit - The number of records to fetch
 * @param offset - The number of records to skip
 */
export async function get(limit: number = 10, offset: number = 0): Promise<Tale.TaleData[]> {
    return await db.getActiveTales(limit, offset);
}

/**
 * Fetches a tale record from the database using the uuid as the search value
 * @param uuid - A valid uuid
 */
export async function getOne(uuid: string): Promise<Tale.TaleData> {
    return await db.getActiveTaleByUuid(new ObjectId(uuid));
}

/**
 * Creates a new tale record in the database
 * @param data - The fields required to create a new tale record
 */
export async function create(data: Tale.Request): Promise<Tale.TaleData> {
    const cleanData = (await cleanTaleData(data)) as Tale.TaleData;

    return await db.createTale(cleanData);
}

/**
 * Updates a tales profile data in the database
 * @param uuid - The UUID for the tale to be updated
 * @param data - An object representing a portion of a tale object
 */
export async function update(uuid: string, data: Tale.Request): Promise<Tale.TaleData> {
    const cleanData = (await cleanTaleData(data)) as Tale.TaleData;

    return await db.updateTale(new ObjectId(uuid), cleanData);
}

/**
 * Mark a tale as inactive
 * @param uuid - The UUID of the tale
 */
export async function remove(uuid: string): Promise<boolean> {
    return await db.deleteTale(new ObjectId(uuid));
}
