import { result } from '../../../db/index.js';

/**
 *
 * @param userId
 * @param props
 */
export const getByUserId = async (users, userId): Promise<User.UserData> => {
    const data = await users.findOne(
        { _id: userId, isDeleted: false },
        { projection: { identities: 1 } },
    );

    return result('There was an error whilst fetching the identities for the user', data);
};

/**
 *
 * @param data
 */
export const create = async (users, userId, identityData): Promise<User.Identitfier> => {
    const {
        identities: [identitiy],
    } = await users.findOneAndUpdate(
        { _id: userId },
        {
            $push: {
                identities: identityData,
            },
        },
        { projection: { identities: { $slice: -1 } }, returnNewDocument: true },
    );

    return result('There was an error whilst creating the identitiy', identitiy);
};

/**
 *
 * @param hash
 * @param uuid
 */
export const remove = async (users, userId, hash: string): Promise<boolean> => {
    const { matchedCount, modifiedCount } = await users.updateOne(
        { _id: userId, 'identities.hash': hash },
        { $set: { 'identities.$.isDeleted': true } },
    );

    return result(
        `There was an error whilst deleting the identitiy with hash ${hash}`,
        matchedCount && matchedCount === modifiedCount,
    );
};
