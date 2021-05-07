import * as queries from './queries.js';

/**
 *
 */
export const getSystemKey = async (dbInstance, key: string): Promise<any> => {
    const system = dbInstance.collection('System');

    return await queries.getSystemKey(system, key);
};
