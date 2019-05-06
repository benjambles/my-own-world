import { result, knex, getOneRaw } from '../../db';

/**
 *
 */
export const getSystemKey = async (key: string): Promise<any> => {
    const queryString = knex('System')
        .select('*')
        .where({
            key
        });
    const query = await getOneRaw(queryString);
    return result('There was an error whilst fetching the requested key', query);
};
