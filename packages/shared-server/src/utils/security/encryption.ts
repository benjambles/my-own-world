import { createCipheriv, createDecipheriv, createHmac, randomBytes } from 'crypto';

/**
 * Decrypt a string encrypted using crypto.createCipher
 * @param value A string in the format of ENCRYPTION_TYPE:cipher
 */
export function decryptValue(password: string, value: string): string {
    const [type, iv, ...data] = value.split(':');
    const decipher = createDecipheriv(
        type,
        Buffer.from(password),
        Buffer.from(iv, 'hex'),
    );
    const decrypted = decipher.update(Buffer.from(data.join(':'), 'hex'));

    return Buffer.concat([decrypted, decipher.final()]).toString();
}

/**
 * Generate an encrypted value in the format of ENCRYPTION_TYPE:cipher
 * @param value A string to be encrypted
 */
export function encryptValue(password: string, value: string): string {
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-cbc', Buffer.from(password), iv);
    const encrypted = cipher.update(value);

    return [
        'aes-256-cbc',
        iv.toString('hex'),
        Buffer.concat([encrypted, cipher.final()]).toString('hex'),
    ].join(':');
}

/**
 * Returns a hmac of the value provided without a salt
 * @param value
 */
export function hmac(password: string, value: string): string {
    return createHmac('sha256', password).update(value).digest('hex');
}
