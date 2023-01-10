import { decryptValue } from '@benjambles/mow-server/dist/utils/security/encryption.js';
import {
    formatData,
    getDataFormatter,
} from '@benjambles/mow-server/dist/utils/data/index.js';
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
        readOnly: ['_id'],
    };

    const formatIdentiferData = formatData(getDataFormatter(ENC_SECRET, formatOptions));
    const identifierQueries = getIdentifierHelpers(db);

    return {
        formatOptions,
        find: async function getByUserId(
            password: string,
            userId: string,
        ): Promise<Identifier[]> {
            const { identities } = await identifierQueries.find(userId);

            return identities.map((identity) => respond(password, identity));
        },
        create: async function create(
            password: string,
            userId: string,
            data: any,
        ): Promise<Identifier> {
            const cleanData = await formatIdentiferData(data);
            const identity = await identifierQueries.create(userId, cleanData);

            return respond(password, identity);
        },
        delete: async function remove(userId: string, hash: string): Promise<boolean> {
            return await identifierQueries.delete(userId, hash);
        },
    };
}
