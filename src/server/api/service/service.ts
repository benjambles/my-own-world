import * as db from './queries';

/**
 *
 */
export async function getSystemKey(key: string): Promise<any> {
    const version = await db.getSystemKey(key);
    return version;
}
