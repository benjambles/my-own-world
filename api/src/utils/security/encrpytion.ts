import { createCipheriv, createDecipheriv, createHmac, randomBytes } from 'crypto';
import { propOr } from 'ramda';
import { encryptionData, hashType } from '../../config';
import type { strToStr } from '../../typings/data';

const separator = ':';
const encodingType = 'hex';
const encryptionKey = encryptionData.password;
const encryptionType = encryptionData.type;

/**
 * Decrypt a string encrypted using crypto.createCipher
 * @param value A string in the format of ENCRYPTION_TYPE:cipher
 */
export const decryptValue: strToStr = (value) => {
    const [type, iv, ...data] = value.split(separator);
    const ivBuffer = Buffer.from(iv, encodingType);
    const encryptedText = Buffer.from(data.join(separator), encodingType);
    const decipher = createDecipheriv(type, Buffer.from(encryptionKey), ivBuffer);
    const decrypted = decipher.update(encryptedText);

    return Buffer.concat([decrypted, decipher.final()]).toString();
};

/**
 * Generate an encrypted value in the format of ENCRYPTION_TYPE:cipher
 * @param value A string to be encrypted
 */
export const encryptValue: strToStr = (value) => {
    const iv = randomBytes(propOr(16, 'ivLength', encryptionData));
    const cipher = createCipheriv(encryptionType, Buffer.from(encryptionKey), iv);
    const encrypted = cipher.update(value);

    return [
        encryptionType,
        iv.toString(encodingType),
        Buffer.concat([encrypted, cipher.final()]).toString(encodingType),
    ].join(separator);
};

/**
 * Returns a hmac of the value provided without a salt
 * @param value
 */
export const hmac: strToStr = (value) => {
    const hmac = createHmac(hashType, encryptionKey);
    hmac.update(value);
    return hmac.digest(encodingType);
};
