import { knex, result, getManyRaw, getOneRaw } from '../../../db';

/**
 *
 * @param userId
 * @param props
 */
export const getByUserId = async (
    userId: string,
    limit: number = 10,
    offset: number = 0
): Promise<User.Identitfier[]> => {
    const queryString = knex('Identities')
        .select('*')
        .where({ userId })
        .limit(limit)
        .offset(offset)
        .toString();
    const query = await getManyRaw(queryString);

    return result('There was an error whilst fetching the identities for the user', query);
};

/**
 *
 * @param identifier
 */
export const getOne = async (hash: string): Promise<User.Identitfier> => {
    const queryString = knex('Identities')
        .select('*')
        .where({ hash })
        .toString();
    const query = await getOneRaw(queryString);
    return result('There was an error whilst fetching the identitiy', query);
};

/**
 *
 * @param data
 */
export const create = async (data): Promise<User.Identitfier> => {
    const queryString = knex('Identities')
        .returning('*')
        .insert(data)
        .toString();
    const query = await getOneRaw(queryString);
    return result('There was an error whilst creating the identitiy', query);
};

/**
 *
 * @param uuid
 */
export const remove = async (uuid: string): Promise<boolean> => {
    const queryString = knex('Identities')
        .returning('true')
        .where({ uuid })
        .del()
        .toString();
    const query = await getOneRaw(queryString);
    return result(`There was an error whilst deleting the identitiy with uuid ${uuid}`, !!query);
};

/**
 *
 * @param userId
 */
export const removeAllByUserId = async (userId: string): Promise<boolean> => {
    const queryString = knex('Identities')
        .returning('true')
        .where({ userId })
        .del()
        .toString();
    const query = await getOneRaw(queryString);
    return result(`There was an error whilst deleteing indentities for userId ${userId}`, !!query);
};
