import { getObjectId, result } from '@benjambles/mow-server/dist/utils/db.js';
import { Db } from 'mongodb';
import { User } from '../queries.js';

export function getIdentifierHelpers(db: Db) {
    const users = db.collection<User>('users');

    return {
        find: async function getIdentifierByUserId(userId) {
            const data = await users.findOne(
                { _id: getObjectId(userId), isDeleted: false },
                { projection: { identities: 1 } },
            );

            return result(
                'There was an error whilst fetching the identities for the user',
                data,
            );
        },
        create: async function createIdentifier(userId, identityData) {
            const user = await users.findOneAndUpdate(
                { _id: getObjectId(userId) },
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
        },
        delete: async function deleteIdentifier(userId, hash) {
            const { matchedCount, modifiedCount } = await users.updateOne(
                { _id: getObjectId(userId), 'identities.hash': { $eq: hash } },
                { $set: { 'identities.$.isDeleted': true } },
            );

            return result(
                `There was an error whilst deleting the identitiy with hash ${hash}`,
                matchedCount && matchedCount === modifiedCount,
            );
        },
    };
}
