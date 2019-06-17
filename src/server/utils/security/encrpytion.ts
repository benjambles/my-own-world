import * as crypto from 'crypto';
import { EncryptionData, HashType } from '../../config';

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
 * Returns a hmac of the value provided without a salt
 * @param value
 */
export async function hmac(value: string): Promise<string> {
    const hmac = crypto.createHmac(HashType, ENCRYPTION_KEY);
    hmac.update(value);
    return hmac.digest('hex');
}
