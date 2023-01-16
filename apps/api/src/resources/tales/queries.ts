import { getObjectId, result } from '@benjambles/mow-server/dist/utils/db.js';
import { randomUUID } from 'crypto';
import { Db, ObjectId } from 'mongodb';

//#region Types
export type Tale = {
    _id: ObjectId;
    isDeleted: boolean;
    ownerId: ObjectId;
    name: string;
    summary: string;
    description: string;
    createdOn: Date;
    lastModifiedOn: Date;
};

export type TaleData = Omit<Tale, '_id'>;
//#endregion Types

export function getTalesHelpers(db: Db) {
    const tales = db.collection<Tale>('Tales');

    const helpers = {
        /**
         * Retrieve a tale with a matching uuid from the database
         * @param uuid - A valid uuid
         */
        find: async function getActiveTaleByUuid(uuid: string): Promise<Tale> {
            const data = await tales.findOne({
                _id: getObjectId(uuid),
                isDeleted: false,
            });
            return result('There was an error whilst fetching the tale', data);
        },

        /**
         * Fetch a list of active tales from the database filtered by parameters
         * @param limit - The number of records to fetch
         * @param offset - The number of records to skip
         */
        get: async function getActiveTales(
            limit: number = 10,
            skip: number = 0,
        ): Promise<Tale[]> {
            const data = tales.find({ isDeleted: false }, { limit, skip }).toArray();

            return result('There was an error whilst fetching tales', data);
        },

        /**
         * Create a new tale from validated data
         * @param data - The formatted data ready for storage
         */
        create: async function createTale(
            taleData: Pick<TaleData, 'name' | 'description' | 'summary' | 'ownerId'>,
        ): Promise<Tale> {
            const { insertedId } = await tales.insertOne({
                ...taleData,
                _id: getObjectId(randomUUID()),
                isDeleted: false,
                createdOn: new Date(),
                lastModifiedOn: new Date(),
            });
            const data = await helpers.find(insertedId.toString());

            return result('There was an error whilst creating the tale', data);
        },

        /**
         * Delete a tale with a given ID
         * @param uuid - A valid uuid
         */
        delete: async function deleteTale(uuid: string): Promise<boolean> {
            const { ok } = await tales.findOneAndUpdate(
                { _id: getObjectId(uuid) },
                { $set: { isDeleted: true } },
                { projection: { isDeleted: 1 } },
            );

            return result('There was an error whilst updating the tale', ok !== 0);
        },

        /**
         * Updates a tale record with the patch provided
         * @param uuid - A UUID representing the tale to be updated
         * @param data - An object representing a patch on a tale
         */
        update: async function updateTale(
            uuid: string,
            taleData: Partial<Tale>,
        ): Promise<Tale> {
            const { value } = await tales.findOneAndUpdate(
                { _id: getObjectId(uuid) },
                { $set: taleData },
            );

            return result('There was an error whilst updating the tale', value);
        },
    };

    return helpers;
}
