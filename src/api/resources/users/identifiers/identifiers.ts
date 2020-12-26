import { ObjectId } from 'mongodb';
import { assoc } from 'ramda';
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
    const identifierData = await db.create(new ObjectId(userId), cleanData);

    return respond(password, identifierData);
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
const respond = (password: string, data: User.Identitfier) => {
    const decryptedIdent = decryptValue(password, data.identifier);

    return assoc('identifier', decryptedIdent, data);
};
