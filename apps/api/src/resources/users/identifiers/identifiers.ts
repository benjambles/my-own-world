import { decryptValue } from '@benjambles/mow-server/dist/utils/security/encryption.js';
import { Db } from 'mongodb';
import { Identifier, User } from '../queries.js';
import * as queries from './queries.js';

export const model = {
    encrypted: ['identifier'],
    hmac: ['hash'],
    readOnly: ['_id'],
};

/**
 *
 * @param userId
 * @param props
 */
export async function getByUserId(
    dbInstance: Db,
    password: string,
    userId: string,
): Promise<Identifier[]> {
    const users = dbInstance.collection<User>('Users');
    const { identities } = await queries.getByUserId(users, userId);

    return identities.map((identity) => respond(password, identity));
}

/**
 *
 * @param userId
 * @param data
 */
export async function create(
    dbInstance: Db,
    formatter,
    password: string,
    userId: string,
    data: any,
): Promise<Identifier> {
    const cleanData = await formatter(data);
    const users = dbInstance.collection<User>('Users');
    const identity = await queries.create(users, userId, cleanData);

    return respond(password, identity);
}

/**
 *
 * @param userId
 * @param hash
 */
export async function remove(
    dbInstance: Db,
    userId: string,
    hash: string,
): Promise<boolean> {
    const users = dbInstance.collection<User>('Users');

    return await queries.remove(users, userId, hash);
}

/**
 *
 * @param data
 */
function respond(password: string, identity: Identifier) {
    const decryptedIdent = decryptValue(password, identity.identifier);

    return { ...identity, identifier: decryptedIdent };
}
