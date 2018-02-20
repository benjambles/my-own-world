import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import * as createError from "http-errors";
import * as jwt from "jsonwebtoken";

import { EncryptionData, hex, jwtSecret, utf8 } from "../config";

const saltRounds = 10;
const EncType = EncryptionData.type;

/**
 * Decrypt a string encrypted using crypto.createCipher
 * @param value A string in the format of encType:cipher
 */
export function decryptValue(value: string): string {
    const [key, cipher] = value.split(":");
    const decipher = crypto.createDecipher(key, EncryptionData.password);
    let decrypted = decipher.update(cipher, hex, utf8);
    decrypted += decipher.final(utf8);

    return decrypted;
}

/**
 * Generate an encrypted value in the format of EncType:cipher
 * @param value A string to be encrypted
 */
export function encryptValue(value: string): string {
    const Cipher = crypto.createCipher(EncType, EncryptionData.password);
    let encrypted = Cipher.update(value, utf8, hex);
    encrypted += Cipher.final(hex);

    return [EncType, encrypted].join(":");
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
export async function compare(value: string, hash: string): Promise<true> {
    const isValid = await bcrypt.compare(value, hash);

    if (!isValid) {
        throw createError(401, "Unable to authenticate user, please check the details provided");
    }

    return isValid;
}

/**
 * Generates a jwt format string for use as an auth token
 * @param data Object representing the data to be stored for later user
 */
export async function getToken(data: object): Promise<string> {
    return jwt.sign(data, jwtSecret, { expiresIn: "1d" });
}
