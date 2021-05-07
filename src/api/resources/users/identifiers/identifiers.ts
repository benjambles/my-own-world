import mongoDB from 'mongodb';
import { decryptValue } from '../../../utils/security/encryption.js';
import * as queries from './queries.js';

const { ObjectId } = mongoDB;

export const model = {
    encrypted: ['identifier'],
    hmac: ['hash'],
    readOnly: ['uuid'],
};

/**
 *
 * @param userId
 * @param props
 */
export const getByUserId = async (
    dbInstance,
    password: string,
    userId: string,
): Promise<User.Identitfier[]> => {
    const users = dbInstance.collection('Users');
    const { identities } = await queries.getByUserId(users, new ObjectId(userId));

    return identities.map((identity) => respond(password, identity));
};

/**
 *
 * @param userId
 * @param data
 */
export const create = async (
    dbInstance,
    formatter,
    password: string,
    userId: string,
    data: any,
): Promise<User.Identitfier> => {
    const cleanData = await formatter(data);
    const users = dbInstance.collection('Users');
    const identity = await queries.create(users, new ObjectId(userId), cleanData);

    return respond(password, identity);
};

/**
 *
 * @param userId
 * @param hash
 */
export const remove = async (dbInstance, userId: string, hash: string): Promise<boolean> => {
    const users = dbInstance.collection('Users');

    return await queries.remove(users, new ObjectId(userId), hash);
};

/**
 *
 * @param data
 */
const respond = (password: string, identity: User.Identitfier) => {
    const decryptedIdent = decryptValue(password, identity.identifier);

    return { ...identity, identifier: decryptedIdent };
};
