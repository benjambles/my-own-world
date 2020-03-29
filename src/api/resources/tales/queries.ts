import { withCollection, result } from '../../db';
import { ObjectId } from 'mongodb';

const tales = withCollection('Tales');

/**
 * Retrieve a tale with a matching uuid from the database
 * @param uuid - A valid uuid
 */
export async function getActiveTaleByUuid(uuid: string): Promise<Tale.TaleData> {
    const data = await tales.findOne({
        uuid,
        isDeleted: false,
    });
    return result('There was an error whilst fetching the tale', data);
}

/**
 * Fetch a list of active tales from the database filtered by parameters
 * @param limit - The number of records to fetch
 * @param offset - The number of records to skip
 */
export async function getActiveTales(
    limit: number = 10,
    skip: number = 0
): Promise<Tale.TaleData[]> {
    const data = tales.find({ isDeleted: false }, { limit, skip }).toArray();

    return result('There was an error whilst fetching tales', data);
}

/**
 * Create a new tale from validated data
 * @param data - The formatted data ready for storage
 */
export async function createTale(taleData: Tale.TaleData): Promise<Tale.TaleData> {
    const { insertedId } = await tales.insertOne(taleData);
    const data = await getActiveTaleByUuid(insertedId);

    return result('There was an error whilst creating the tale', data);
}

/**
 * Delete a tale with a given ID
 * @param uuid - A valid uuid
 */
export async function deleteTale(uuid: ObjectId): Promise<boolean> {
    const data = await tales.findOneAndUpdate(
        { _id: uuid },
        { $set: { isDeleted: true } },
        { projection: { isDeleted: 1 } }
    );

    return result('There was an error whilst updating the tale', data);
}

/**
 * Updates a tale record with the patch provided
 * @param uuid - A UUID representing the tale to be updated
 * @param data - An object representing a patch on a tale
 */
export async function updateTale(uuid: ObjectId, taleData: Tale.TaleData): Promise<Tale.TaleData> {
    const data = await tales.findOneAndUpdate({ _id: uuid }, { $set: taleData });

    return result('There was an error whilst updating the tale', data);
}
