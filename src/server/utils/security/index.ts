import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as createError from 'http-errors';
import * as jwt from 'jsonwebtoken';

import { EncryptionData, jwtSecret, HashType } from '../config';

const ENCRYPTION_TYPE = EncryptionData.type;
const IV_LENGTH = EncryptionData.ivLength;
const ENCRYPTION_KEY = EncryptionData.password;

/**
 * Decrypt a string encrypted using crypto.createCipher
 * @param value A string in the format of ENCRYPTION_TYPE:cipher
 */
export function decryptValue(value: string): string {
    const [type, iv, ...data] = value.split(':');
    const ivBuffer = iv === 'null' ? null : Buffer.from(iv, 'hex');
    const encryptedText = Buffer.from(data.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(type, Buffer.from(ENCRYPTION_KEY), ivBuffer);
    const decrypted = decipher.update(encryptedText);

    return Buffer.concat([decrypted, decipher.final()]).toString();
}

/**
 * Generate an encrypted value in the format of ENCRYPTION_TYPE:cipher
 * @param value A string to be encrypted
 */
export function encryptValue(value: string): string {
    const iv = IV_LENGTH ? crypto.randomBytes(IV_LENGTH) : null;
    const cipher = crypto.createCipheriv(ENCRYPTION_TYPE, Buffer.from(ENCRYPTION_KEY), iv);
    const encrypted = cipher.update(value);

    return [
        ENCRYPTION_TYPE,
        iv.toString('hex'),
        Buffer.concat([encrypted, cipher.final()]).toString('hex')
    ].join(':');
}

/**
 * Generate a blowfish based hash of a value using bcrypt
 * @param value A string to be hashed
 */
export async function bHash(value: string): Promise<string> {
    const SALT_ROUNDS = 10;
    return await bcrypt.hash(value, SALT_ROUNDS);
}

/**
 * Compare a bcrypt blowfish based hash and a string
 * @param value The string to be tested
 * @param hash  A bcrypted hash to compare against
 */
export async function compareBHash(value: string, hash: string): Promise<true> {
    const isValid = await bcrypt.compare(value, hash);

    if (!isValid) {
        throw createError(401, 'No match found');
    }

    return isValid;
}

/**
 * Generates a jwt format string for use as an auth token
 * @param data Object representing the data to be stored for later user
 */
export async function getToken(data: object): Promise<string> {
    return jwt.sign(data, jwtSecret, { expiresIn: '1d' });
}

/**
 * Returns a hmac of the value provided without a salt
 * @param value
 */
export async function hmac(value: string): Promise<string> {
    const hmac = crypto.createHmac(HashType, ENCRYPTION_KEY);
    hmac.update(value);
    return hmac.digest('hex');
}
