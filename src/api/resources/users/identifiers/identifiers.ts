import { ObjectId } from 'mongodb';
import { decryptValue } from '../../../utils/security/encryption';
import * as db from './queries';

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
    password: string,
    userId: string,
): Promise<User.Identitfier[]> => {
    const { identities } = await db.getByUserId(new ObjectId(userId));

    return identities.map((identity) => respond(password, identity));
};

/**
 *
 * @param userId
 * @param data
 */
export const create = async (
    formatter,
    password: string,
    userId: string,
    data: any,
): Promise<User.Identitfier> => {
    const cleanData = await formatter(data);
    const identity = await db.create(new ObjectId(userId), cleanData);

    return respond(password, identity);
};

/**
 *
 * @param userId
 * @param hash
 */
export const remove = async (userId: string, hash: string): Promise<boolean> => {
    return await db.remove(new ObjectId(userId), hash);
};

/**
 *
 * @param data
 */
const respond = (password: string, identity: User.Identitfier) => {
    const decryptedIdent = decryptValue(password, identity.identifier);

    return { ...identity, identifier: decryptedIdent };
};
