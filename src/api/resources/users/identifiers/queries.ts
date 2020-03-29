import { ObjectId } from 'mongodb';
import { withCollection, result } from '../../../db';

const users = withCollection('Users');

/**
 *
 * @param userId
 * @param props
 */
export async function getByUserId(userId: ObjectId): Promise<User.UserData> {
    const data = await users.findOne(
        { _id: userId, isDeleted: false },
        { projection: { identities: 1 } }
    );

    return result('There was an error whilst fetching the identities for the user', data);
}

/**
 *
 * @param data
 */
export async function create(userId, identityData): Promise<User.Identitfier> {
    const {
        identities: [identitiy],
    } = await users.findOneAndUpdate(
        { _id: userId },
        {
            $push: {
                identities: identityData,
            },
        },
        { projection: { identities: { $slice: -1 } }, returnNewDocument: true }
    );

    return result('There was an error whilst creating the identitiy', identitiy);
}

/**
 *
 * @param hash
 * @param uuid
 */
export async function remove(userId: ObjectId, hash: string): Promise<boolean> {
    const { matchedCount, modifiedCount } = await users.updateOne(
        { _id: userId, 'identities.hash': hash },
        { $set: { 'identities.$.isDeleted': true } }
    );

    return result(
        `There was an error whilst deleting the identitiy with hash ${hash}`,
        matchedCount && matchedCount === modifiedCount
    );
}
