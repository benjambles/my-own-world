import { cleanData, cloneData, format, getUUID } from '../../../utils';
import * as Security from '../../../utils/security';
import * as db from './queries';

const formatters = {
    encrypted: ['identifier'],
    hashed: { hmac: ['hash'] },
    readOnly: ['uuid']
};
/**
 * Prepares am identifier object for database insertion
 */
const formatIdentity = format(formatters);
const cleanIdentityData = cleanData(formatIdentity);

/**
 * Fetches an identifier object record when given a plain text identifier
 * @param identifier - An identifier string to be encrypted and fetched
 * @returns {User.Identitfier}
 */
export async function getByIndentifier(identifier: string): Promise<User.Identitfier> {
    const identifierHash = await Security.hmac(identifier);
    const identifierData = await db.getOne(identifierHash);
    return respond(identifierData);
}

/**
 *
 * @param userId
 * @param props
 */
export async function getByUserId(
    userId: string,
    limit: number = 10,
    offset: number = 0
): Promise<User.Identitfier[]> {
    const identifiers = await db.getByUserId(userId, limit, offset);
    return identifiers.map(respond);
}

/**
 *
 * @param userId
 * @param data
 */
export async function create(userId: string, data: any): Promise<User.Identitfier> {
    const cleanData = await cleanIdentityData(data);
    cleanData.uuid = getUUID(cleanData.identifier);
    cleanData.userId = userId;
    const identifierData = await db.create(cleanData);
    return respond(identifierData);
}

/** */
export const remove = db.remove;

/** */
export const removeAll = db.removeAllByUserId;

/**
 *
 * @param data
 */
function respond(data) {
    const clonedData = cloneData(data);
    clonedData.identifier = Security.decryptValue(clonedData.identifier);

    return clonedData;
}
