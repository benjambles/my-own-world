import {
    formatData,
    getDataFormatter,
} from '@benjambles/mow-server/dist/utils/data/index.js';
import { ModelResult, getObjectId } from '@benjambles/mow-server/dist/utils/db.js';
import { decryptValue } from '@benjambles/mow-server/dist/utils/security/encryption.js';
import { Db } from 'mongodb';
import { Env } from '../../../schema/env-schema.js';
import { User, getUserCollection } from './users.js';

export type Identifier = User['identities'][number];

export function getIdentifierModel(db: Db, { ENC_SECRET }: Env) {
    const users = getUserCollection(db);

    const formatIdentiferData = formatData(
        getDataFormatter(ENC_SECRET, {
            encrypted: ['identifier'],
            hmac: ['hash'],
        }),
    );

    return {
        formatIdentiferData,
        find: async function getByUserId(userId: string): ModelResult<Identifier[]> {
            const dbResult = await users.findOne(
                { _id: getObjectId(userId), isDeleted: false },
                { projection: { identities: 1 } },
            );

            return {
                ok: !!dbResult,
                value: dbResult?.identities.map((identity) =>
                    respond(ENC_SECRET, identity),
                ),
            };
        },
        create: async function create(
            userId: string,
            data: Pick<Identifier, 'identifier' | 'type'>,
        ): ModelResult<Identifier> {
            const identityData = await formatIdentiferData(
                Object.assign(data, {
                    hash: data.identifier,
                    isDeleted: false,
                    isVerified: false,
                }),
            );

            const { ok, value } = await users.findOneAndUpdate(
                { _id: getObjectId(userId) },
                {
                    $push: {
                        identities: identityData,
                    },
                },
                {
                    includeResultMetadata: true,
                    projection: { identities: { $slice: -1 } },
                },
            );

            return { ok: !!ok, value: value.identities[0] };
        },
        delete: async function remove(userId: string, hash: string): ModelResult<number> {
            const { matchedCount, modifiedCount } = await users.updateOne(
                { _id: getObjectId(userId), 'identities.hash': { $eq: hash } },
                { $set: { 'identities.$.isDeleted': true } },
            );

            return {
                ok: !!matchedCount && matchedCount === modifiedCount,
                value: matchedCount,
            };
        },
        getUserByIdentifier: async function getUserByIdentifier(
            hash: string,
        ): ModelResult<User> {
            const value = await users.findOne({
                'identities.hash': { $eq: hash },
                isDeleted: false,
            });

            return { ok: !!value, value };
        },
    };
}

/**
 *
 * @param data
 */
function respond(password: string, identity: Identifier) {
    identity.identifier = decryptValue(password, identity.identifier);
    return identity;
}
