import { result, withCollection } from '../../db';

const system = withCollection('System');

/**
 *
 */
export const getSystemKey = async (key: string): Promise<any> => {
    const data = await system.findOne({ key });

    return result('There was an error whilst fetching the requested key', data);
};
