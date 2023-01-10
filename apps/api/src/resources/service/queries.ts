import { result } from '@benjambles/mow-server/dist/utils/db.js';
import { Db } from 'mongodb';

export function getSystemHelpers(db: Db) {
    const system = db.collection('System');

    return {
        find: async function getSystemKey(key: string): Promise<any> {
            const data = await system.findOne({ key });

            return result('There was an error whilst fetching the requested key', data);
        },
    };
}
