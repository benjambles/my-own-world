import { result } from '@benjambles/mow-server/dist/utils/db.js';
import { Collection, ObjectId } from 'mongodb';
import { Identifier, User } from '../queries.js';
/**
 *
 * @param userId
 * @param props
 */
export async function getByUserId(
    users: Collection<User>,
    userId: string,
): Promise<User> {
    const data = await users.findOne(
        { _id: new ObjectId(userId), isDeleted: false },
        { projection: { identities: 1 } },
    );

    return result('There was an error whilst fetching the identities for the user', data);
}

/**
 *
 * @param data
 */
export async function create(
    users: Collection<User>,
    userId: string,
    identityData,
): Promise<Identifier> {
    const user = await users.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        {
            $push: {
                identities: identityData,
            },
        },
        { projection: { identities: { $slice: -1 } } },
    );

    return result(
        'There was an error whilst creating the identity',
        user.value?.identities?.[0] || null,
    );
}

/**
 *
 * @param hash
 * @param uuid
 */
export async function remove(
    users: Collection<User>,
    userId: string,
    hash: string,
): Promise<boolean> {
    const { matchedCount, modifiedCount } = await users.updateOne(
        { _id: new ObjectId(userId), 'identities.hash': hash },
        { $set: { 'identities.$.isDeleted': true } },
    );

    return result(
        `There was an error whilst deleting the identitiy with hash ${hash}`,
        matchedCount && matchedCount === modifiedCount,
    );
}
