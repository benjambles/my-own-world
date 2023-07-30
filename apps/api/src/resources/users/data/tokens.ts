import { getObjectId, ModelResult } from '@benjambles/mow-server/dist/utils/db.js';
import { Db } from 'mongodb';
import { getUserCollection, User } from './users.js';

/**
 *
 * @param data
 */

export function getTokenModel(db: Db) {
    const users = getUserCollection(db);

    const model = {
        create: async function (
            uuid: string,
            {
                tokenData,
                lastLoggedIn,
            }: { tokenData: User['accessTokens'][number]; lastLoggedIn: Date },
        ): ModelResult<User> {
            const { ok, value } = await users.findOneAndUpdate(
                { _id: getObjectId(uuid) },
                {
                    $push: { accessTokens: tokenData },
                    $set: { lastLoggedIn },
                },
                { projection: { _id: 1, accessTokens: 1 } },
            );

            return { ok: !!ok, value };
        },
        find: async function (
            userId: string,
            refreshToken: string,
        ): ModelResult<User['accessTokens'][number]> {
            const dbResult = await users.findOne(
                {
                    _id: getObjectId(userId),
                    'accessTokens.refreshToken': { $eq: refreshToken },
                },
                { projection: { accessTokens: 1 } },
            );

            return { ok: !!dbResult, value: dbResult?.accessTokens[0] };
        },
        get: async function (userId: string): ModelResult<User['accessTokens']> {
            const dbResult = await users.findOne(
                {
                    _id: getObjectId(userId),
                },
                { projection: { accessTokens: 1 } },
            );

            return { ok: !!dbResult, value: dbResult?.accessTokens };
        },
        delete: async function (
            userId: string,
            refreshToken: string,
        ): ModelResult<number> {
            const { matchedCount, modifiedCount } = await users.updateOne(
                { _id: getObjectId(userId) },
                { $pull: { accessTokens: { refreshToken: refreshToken } } },
            );

            return {
                ok: !!matchedCount && matchedCount === modifiedCount,
                value: matchedCount,
            };
        },
        update: async function (
            userId: string,
            refreshToken: string,
            accessToken: string,
        ): ModelResult<User> {
            const { ok, value } = await users.findOneAndUpdate(
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

            return { ok: !!ok, value };
        },
    };

    return model;
}
