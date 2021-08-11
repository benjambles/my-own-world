import { result } from '../../db/index.js';

/**
 *
 */
export const getSystemKey = async (system, key: string): Promise<any> => {
    const data = await system.findOne({ key });

    return result('There was an error whilst fetching the requested key', data);
};
