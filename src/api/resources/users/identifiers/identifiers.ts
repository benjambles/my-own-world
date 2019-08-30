import { ObjectId } from 'mongodb';
import { assoc } from 'ramda';
import formatter from '../../../utils/data/formatter';
import { decryptValue } from '../../../utils/security/encrpytion';
import * as db from './queries';

const format = {
    encrypted: ['identifier'],
    hmac: ['hash'],
    readOnly: ['uuid']
};

/**
 * Prepares am identifier object for database insertion
 */
const cleanIdentityData = formatter(format);

/**
 *
 * @param userId
 * @param props
 */
export async function getByUserId(userId: string): Promise<User.Identitfier[]> {
    const { identities } = await db.getByUserId(new ObjectId(userId));

    return identities.map(respond);
}

/**
 *
 * @param userId
 * @param data
 */
export async function create(userId: string, data: any): Promise<User.Identitfier> {
    const cleanData = await cleanIdentityData(data);
    const identifierData = await db.create(new ObjectId(userId), cleanData);

    return respond(identifierData);
}

/**
 *
 * @param userId
 * @param hash
 */
export async function remove(userId: string, hash: string): Promise<boolean> {
    return await db.remove(new ObjectId(userId), hash);
}

/**
 *
 * @param data
 */
function respond(data: User.Identitfier) {
    const decryptedIdent = decryptValue(data.identifier);

    return assoc('identifier', decryptedIdent, data);
}
