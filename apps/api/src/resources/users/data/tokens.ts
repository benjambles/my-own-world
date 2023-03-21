import { getObjectId, getOrThrow } from '@benjambles/mow-server/dist/utils/db.js';
import { Db } from 'mongodb';
import { User } from './users.js';

/**
 *
 * @param data
 */

export function getTokenModel(db: Db) {
    const users = db.collection<User>('users');

    const model = {
        create: async function (
            uuid: string,
            {
                tokenData,
                lastLoggedIn,
            }: { tokenData: User['accessTokens'][number]; lastLoggedIn: Date },
        ): Promise<User> {
            const dbResult = await users.findOneAndUpdate(
                { _id: getObjectId(uuid) },
                {
                    $push: { accessTokens: tokenData },
                    $set: { lastLoggedIn },
                },
                { projection: { _id: 1, accessTokens: 1 } },
            );

            return getOrThrow(
                'There was an error whilst updating the user',
                dbResult.value,
            );
        },
        find: async function (
            userId: string,
            refreshToken: string,
        ): Promise<User['accessTokens']> {
            const dbResult = await users.findOne(
                {
                    _id: getObjectId(userId),
                    'accessTokens.refreshToken': { $eq: refreshToken },
                },
                { projection: { accessTokens: 1 } },
            );

            return getOrThrow(
                'There was an error whilst fetching the user token',
                dbResult.accessTokens,
            );
        },
        get: async function (userId: string): Promise<User['accessTokens']> {
            const dbResult = await users.findOne(
                {
                    _id: getObjectId(userId),
                },
                { projection: { accessTokens: 1 } },
            );

            return getOrThrow(
                'There was an error whilst fetching the user token',
                dbResult.accessTokens,
            );
        },
        delete: async function (userId: string, refreshToken: string): Promise<Boolean> {
            const { matchedCount, modifiedCount } = await users.updateOne(
                { _id: getObjectId(userId) },
                { $pull: { accessTokens: { refreshToken: refreshToken } } },
            );

            return getOrThrow(
                `There was an error whilst deleting the token with value ${refreshToken}`,
                matchedCount && matchedCount === modifiedCount,
            );
        },
        update: async function (
            userId: string,
            refreshToken: string,
            accessToken: string,
        ): Promise<User> {
            const dbResult = await users.findOneAndUpdate(
                {
                    _id: getObjectId(userId),
                    'accessTokens.refreshToken': { $eq: refreshToken },
                },
                {
                    $set: {
                        'accessTokens.$.refreshToken': refreshToken,
                        'accessTokens.$.accessToken': accessToken,
                    },
                },
                { projection: { identities: 0, accessTokens: 0 } },
            );

            return getOrThrow(
                'There was an error whilst updating the user',
                dbResult.value,
            );
        },
    };

    return model;
}
