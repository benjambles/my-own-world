import * as bcrypt from 'bcrypt';
import * as createError from 'http-errors';

/**
 * Generate a blowfish based hash of a value using bcrypt
 * @param value A string to be hashed
 */
export async function bHash(value: string): Promise<string> {
    return await bcrypt.hash(value, 10);
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

    return true;
}
