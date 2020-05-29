import * as db from './queries';

/**
 *
 */
export const getSystemKey = async (key: string): Promise<any> => await db.getSystemKey(key);
