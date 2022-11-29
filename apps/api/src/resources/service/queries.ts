import { result } from '@benjambles/mow-server/dist/utils/db.js';
import { Collection } from 'mongodb';

/**
 *
 */
export async function getSystemKey(system: Collection, key: string): Promise<any> {
    const data = await system.findOne({ key });

    return result('There was an error whilst fetching the requested key', data);
}
