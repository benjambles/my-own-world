import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { EncryptionData, utf8, hex, HashType, jwtSecret } from '../../lib/constants';

const saltRounds = 10;
const EncType = EncryptionData.type;

/**
 * Decrypt a string encrypted using crypto.createCipher
 * @param value A string in the format of encType:cipher
 */
export async function decryptValue(value: string): Promise<string> {
    const [key, cipher] = value.split(':');
    const decipher = crypto.createDecipher(key, EncryptionData.password);
    let decrypted = decipher.update(cipher, hex, utf8);
    decrypted += decipher.final(utf8);

    return decrypted;
}

/**
 * Generate an encrypted value in the format of EncType:cipher
 * @param value A string to be encrypted
 */
export async function encryptValue(value: string): Promise<string> {
    const Cipher = crypto.createCipher(EncType, EncryptionData.password);
    let encrypted = Cipher.update(value, utf8, hex);
    encrypted += Cipher.final(hex);

    return [EncType, encrypted].join(':');
}

/**
 * Generate a blowfish based hash of a value using bcrypt
 * @param value A string to be hashed
 */
export async function hash(value: string): Promise<string> {
    return await bcrypt.hash(value, saltRounds);
}

/**
 * Compare a bcrypt blowfish based hash and a string
 * @param value The string to be tested
 * @param hash  A bcrypted hash to compare against
 */
export async function compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
}

/**
 * Generates a jwt format string for use as an auth token
 * @param data Object representing the data to be stored for later user
 */
export async function getToken(data: object): Promise<string> {
    return jwt.sign(data, jwtSecret, { expiresIn: '1d' });
}