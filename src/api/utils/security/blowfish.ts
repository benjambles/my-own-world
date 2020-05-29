import { compare, hash } from 'bcrypt';
import createError from 'http-errors';
import { asyncStrToStr } from '../../typings/data';

/**
 * Generate a blowfish based hash of a value using bcrypt
 * @param value A string to be hashed
 */
export const bHash: asyncStrToStr = async (value) => {
    return await hash(value, 10);
};

/**
 * Compare a bcrypt blowfish based hash and a string
 * @param value The string to be tested
 * @param hash  A bcrypted hash to compare against
 */
export const compareBHash = async (value: string, hash: string): Promise<true> => {
    const isValid = await compare(value, hash);

    if (!isValid) {
        throw createError(401, 'No match found');
    }

    return true;
};
