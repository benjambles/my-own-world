import {
    formatData,
    getDataFormatter,
} from '@benjambles/mow-server/dist/utils/data/index.js';
import { getObjectId, ModelResult } from '@benjambles/mow-server/dist/utils/db.js';
import { decryptValue } from '@benjambles/mow-server/dist/utils/security/encryption.js';
import { Db } from 'mongodb';
import { Env } from '../../../schema/env-schema.js';
import { User } from './users.js';

export type Identifier = User['identities'][number];

/**
 *
 * @param data
 */
function respond(password: string, identity: Identifier) {
    return {
        ...identity,
        identifier: decryptValue(password, identity.identifier),
    };
}

export function getIdentifierModel(db: Db, { ENC_SECRET }: Env) {
    const users = db.collection<User>('users');

    const formatOptions = {
        encrypted: ['identifier'],
        hmac: ['hash'],
        readOnly: [],
        salted: [],
    };

    const formatIdentiferData = formatData(getDataFormatter(ENC_SECRET, formatOptions));

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
            const identityData = await formatIdentiferData({
                ...data,
                isDeleted: false,
                hash: data.identifier,
                verified: false,
            });

            const { ok, value } = await users.findOneAndUpdate(
                { _id: getObjectId(userId) },
                {
                    $push: {
                        identities: identityData,
                    },
                },
                { projection: { identities: { $slice: -1 } } },
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
            identifier: string,
        ): ModelResult<User> {
            const value = await users.findOne({
                'identities.hash': { $eq: identifier },
                isDeleted: false,
            });

            return { ok: !!value, value };
        },
    };
}
