import {
    formatData,
    getDataFormatter,
} from '@benjambles/mow-server/dist/utils/data/index.js';
import { getObjectId, getOrThrow } from '@benjambles/mow-server/dist/utils/db.js';
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
    const decryptedIdent = decryptValue(password, identity.identifier);

    return { ...identity, identifier: decryptedIdent };
}

export function getIdentifierModel(db: Db, { ENC_SECRET }: Env) {
    const users = db.collection<User>('users');

    const formatOptions = {
        salted: [],
        encrypted: ['identifier'],
        hmac: ['hash'],
        readOnly: [],
    };

    const formatIdentiferData = formatData(getDataFormatter(ENC_SECRET, formatOptions));

    const model = {
        formatIdentiferData,
        find: async function getByUserId(
            password: string,
            userId: string,
        ): Promise<Identifier[]> {
            const dbResult = await users.findOne(
                { _id: getObjectId(userId), isDeleted: false },
                { projection: { identities: 1 } },
            );

            return getOrThrow(
                'There was an error whilst fetching the identities for the user',
                dbResult,
            ).identities.map((identity) => respond(password, identity));
        },
        create: async function create(
            userId: string,
            data: Pick<Identifier, 'identifier' | 'type'>,
        ): Promise<Identifier> {
            const identifier: Identifier = {
                isDeleted: false,
                verified: false,
                ...data,
                hash: data.identifier,
            };

            const identityData = await formatIdentiferData(identifier);

            const dbResult = await users.findOneAndUpdate(
                { _id: getObjectId(userId) },
                {
                    $push: {
                        identities: identityData,
                    },
                },
                { projection: { identities: { $slice: -1 } } },
            );

            return respond(
                ENC_SECRET,
                getOrThrow(
                    'There was an error whilst creating the identity',
                    dbResult.value?.identities?.[0] || null,
                ),
            );
        },
        delete: async function remove(userId: string, hash: string): Promise<boolean> {
            const { matchedCount, modifiedCount } = await users.updateOne(
                { _id: getObjectId(userId), 'identities.hash': { $eq: hash } },
                { $set: { 'identities.$.isDeleted': true } },
            );

            return getOrThrow(
                `There was an error whilst deleting the identitiy with hash ${hash}`,
                matchedCount && matchedCount === modifiedCount,
            );
        },
    };

    return model;
}
