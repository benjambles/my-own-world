import { assoc } from 'ramda';
import formatter from '../../../utils/data/formatter';
import { decryptValue, hmac } from '../../../utils/security/encrpytion';
import getUUID from '../../../utils/uuids/get-uuid';
import * as db from './queries';

const format = {
    encrypted: ['identifier'],
    hmac: ['hash'],
    readOnly: ['uuid']
};

/**
 *
 * @param data
 */
const respond = (data: User.Identitfier) => {
    const decryptedIdent = decryptValue(data.identifier);
    return assoc('identifier', decryptedIdent, data);
};

/**
 * Prepares am identifier object for database insertion
 */
const cleanIdentityData = formatter(format);

/**
 * Fetches an identifier object record when given a plain text identifier
 * @param identifier - An identifier string to be encrypted and fetched
 */
export const getByIndentifier = async (identifier: string): Promise<User.Identitfier> => {
    const identifierHash = await hmac(identifier);
    const identifierData = await db.getOne(identifierHash);
    return respond(identifierData);
};

/**
 *
 * @param userId
 * @param props
 */
export const getByUserId = async (
    userId: string,
    limit: number = 10,
    offset: number = 0
): Promise<User.Identitfier[]> => {
    const identifiers = await db.getByUserId(userId, limit, offset);
    return identifiers.map(respond);
};

/**
 *
 * @param userId
 * @param data
 */
export const create = async (userId: string, data: any): Promise<User.Identitfier> => {
    const cleanData = await cleanIdentityData(data);
    cleanData.uuid = getUUID(cleanData.identifier);
    cleanData.userId = userId;
    const identifierData = await db.create(cleanData);
    return respond(identifierData);
};

/** */
export const remove = db.remove;

/** */
export const removeAll = db.removeAllByUserId;
