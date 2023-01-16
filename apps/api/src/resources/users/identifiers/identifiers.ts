import {
    formatData,
    getDataFormatter,
} from '@benjambles/mow-server/dist/utils/data/index.js';
import { decryptValue } from '@benjambles/mow-server/dist/utils/security/encryption.js';
import { Db } from 'mongodb';
import { Env } from '../../../schema/env-schema.js';
import { Identifier } from '../queries.js';
import { getIdentifierHelpers } from './queries.js';

/**
 *
 * @param data
 */
function respond(password: string, identity: Identifier) {
    const decryptedIdent = decryptValue(password, identity.identifier);

    return { ...identity, identifier: decryptedIdent };
}

export function getIdentifierModel(db: Db, { ENC_SECRET }: Env) {
    const formatOptions = {
        salted: [],
        encrypted: ['identifier'],
        hmac: ['hash'],
        readOnly: [],
    };

    const formatIdentiferData = formatData(getDataFormatter(ENC_SECRET, formatOptions));
    const identifierQueries = getIdentifierHelpers(db);

    return {
        formatIdentiferData,
        find: async function getByUserId(
            password: string,
            userId: string,
        ): Promise<Identifier[]> {
            const { identities } = await identifierQueries.find(userId);

            return identities.map((identity) => respond(password, identity));
        },
        create: async function create(
            userId: string,
            data: Pick<Identifier, 'identifier' | 'type'>,
        ): Promise<Identifier> {
            const identifier: Partial<Identifier> = {
                isDeleted: false,
                verified: false,
                ...data,
                hash: data.identifier,
            };

            const cleanData = await formatIdentiferData(identifier);
            const identity = await identifierQueries.create(userId, cleanData);

            return respond(ENC_SECRET, identity);
        },
        delete: async function remove(userId: string, hash: string): Promise<boolean> {
            return await identifierQueries.delete(userId, hash);
        },
    };
}
