import { hash } from 'bcrypt';
export { compare as compareBHash } from 'bcrypt';

/**
 * Generate a blowfish based hash of a value using bcrypt
 * @param value A string to be hashed
 */
export async function bHash(value: string): Promise<string> {
    return await hash(value, 10);
}
