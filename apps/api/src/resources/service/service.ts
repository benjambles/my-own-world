import { Db } from 'mongodb';
import { getSystemHelpers } from './queries.js';

export function getServiceModel(db: Db) {
    const systemQueries = getSystemHelpers(db);
    return {
        find: async function getSystemKey(key: string): Promise<any> {
            return await systemQueries.find(key);
        },
    };
}
