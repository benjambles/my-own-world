import * as db from './queries';

/**
 *
 */
export const getSystemKey = async (key: string): Promise<any> => {
    const version = await db.getSystemKey(key);
    return version;
};
