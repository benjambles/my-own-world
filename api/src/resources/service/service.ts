import * as db from './queries';

/**
 *
 */
export async function getSystemKey(key: string): Promise<any> {
    return await db.getSystemKey(key);
}
