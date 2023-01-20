import {
    formatData,
    getDataFormatter,
    ModelOptions,
} from '@benjambles/mow-server/dist/utils/data/index.js';
import { getObjectId } from '@benjambles/mow-server/dist/utils/db.js';
import { Db } from 'mongodb';
import { Env } from '../../schema/env-schema.js';
import { getTalesHelpers, Tale, TaleData } from './queries.js';

type ToStringKeys = '_id' | 'createdOn' | 'lastModifiedOn' | 'ownerId';

type TaleResponse = Omit<Tale, ToStringKeys> & {
    [key in ToStringKeys]: string;
};

export const cleanResponse = (tale: Tale): TaleResponse => {
    return {
        ...tale,
        _id: tale._id.toString(),
        createdOn: tale.createdOn.toISOString(),
        lastModifiedOn: tale.lastModifiedOn.toISOString(),
        ownerId: tale.ownerId.toString(),
    };
};

export function talesModel(db: Db, { ENC_SECRET }: Env) {
    const formatOptions: ModelOptions = {
        encrypted: [],
        salted: [],
        readOnly: ['_id'],
        hmac: [],
    };

    const formatTaleData = formatData(getDataFormatter(ENC_SECRET, formatOptions));

    const taleQueries = getTalesHelpers(db);

    const helpers = {
        /**
         * Get a list of active tales
         * @param limit - The number of records to fetch
         * @param offset - The number of records to skip
         */
        get: async function getTale(
            limit: number = 10,
            offset: number = 0,
        ): Promise<TaleResponse[]> {
            const response = await taleQueries.get(limit, offset);
            return response.map(cleanResponse);
        },

        /**
         * Fetches a tale record from the database using the uuid as the search value
         * @param uuid - A valid uuid
         */
        find: async function findTaleByUuid(uuid: string): Promise<TaleResponse> {
            const response = await taleQueries.find(uuid);
            return cleanResponse(response);
        },

        /**
         * Creates a new tale record in the database
         * @param data - The fields required to create a new tale record
         */
        create: async function createTale(
            data: Pick<TaleData, 'name' | 'description' | 'summary'> & {
                ownerId: string;
            },
        ): Promise<TaleResponse> {
            const cleanData = await formatTaleData({
                ...data,
                ownerId: getObjectId(data.ownerId),
            });

            const response = await taleQueries.create(cleanData);
            return cleanResponse(response);
        },

        /**
         * Updates a tales profile data in the database
         * @param uuid - The UUID for the tale to be updated
         * @param data - An object representing a portion of a tale object
         */
        update: async function updateTale(
            uuid: string,
            data: Partial<Pick<TaleData, 'name' | 'description' | 'summary'>>,
        ): Promise<TaleResponse> {
            const cleanData = await formatTaleData(data);

            const response = await taleQueries.update(uuid, cleanData);
            return cleanResponse(response);
        },

        /**
         * Mark a tale as inactive
         * @param uuid - The UUID of the tale
         */
        delete: async function deleteTake(uuid: string): Promise<boolean> {
            return await taleQueries.delete(uuid);
        },
    };

    return helpers;
}
