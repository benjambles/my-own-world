import { decryptValue } from '@benjambles/mow-server/dist/utils/security/encryption.js';
import mongoDB from 'mongodb';
import { Identifier } from '../users.js';
import * as queries from './queries.js';
const { ObjectId } = mongoDB;

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
    dbInstance,
    password: string,
    userId: string,
): Promise<Identifier[]> {
    const users = dbInstance.collection('Users');
    const { identities } = await queries.getByUserId(users, new ObjectId(userId));

    return identities.map((identity) => respond(password, identity));
}

/**
 *
 * @param userId
 * @param data
 */
export async function create(
    dbInstance,
    formatter,
    password: string,
    userId: string,
    data: any,
): Promise<Identifier> {
    const cleanData = await formatter(data);
    const users = dbInstance.collection('Users');
    const identity = await queries.create(users, new ObjectId(userId), cleanData);

    return respond(password, identity);
}

/**
 *
 * @param userId
 * @param hash
 */
export async function remove(dbInstance, userId: string, hash: string): Promise<boolean> {
    const users = dbInstance.collection('Users');

    return await queries.remove(users, new ObjectId(userId), hash);
}

/**
 *
 * @param data
 */
function respond(password: string, identity: Identifier) {
    const decryptedIdent = decryptValue(password, identity.identifier);

    return { ...identity, identifier: decryptedIdent };
}
