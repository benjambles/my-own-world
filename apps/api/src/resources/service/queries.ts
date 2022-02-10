import { result } from '@benjambles/mow-server/dist/utils/db.js';

/**
 *
 */
export async function getSystemKey(system, key: string): Promise<any> {
    const data = await system.findOne({ key });

    return result('There was an error whilst fetching the requested key', data);
}
