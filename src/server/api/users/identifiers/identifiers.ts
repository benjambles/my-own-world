import { cleanData, cloneData, format, getUUID } from '../../../utils';
import * as Security from '../../../utils/security';
import * as db from './queries';

const model = {
    encrypted: ['identifier'],
    hashed: [],
    readOnly: ['uuid']
};
/**
 * Prepares am identifier object for database insertion
 */
const formatIdentity = format(model);
const cleanIdentityData = cleanData(formatIdentity);

/**
 *
 * @param identifier
 */
export async function getByIndentifier(identifier: string) {
    const identifierHash = await Security.encryptValue(identifier);
    const identifierData = await db.getOne(identifierHash);
    return respond(identifierData);
}

/**
 *
 * @param userId
 * @param props
 */
export async function getByUserId(userId: string, props: dbGet = { limit: 10, offset: 0 }) {
    const identifiers = await db.getByUserId(userId, props);
    return identifiers.map(respond);
}

/**
 *
 * @param userId
 * @param data
 */
export async function create(userId: string, data) {
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
