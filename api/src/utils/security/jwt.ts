import * as jwt from 'jsonwebtoken';
import { jwtSecret } from '../../config';

/**
 * Generates a jwt format string for use as an auth token
 * @param data Object representing the data to be stored for later user
 */
export async function getToken(data: object): Promise<string> {
    return jwt.sign(data, jwtSecret, { expiresIn: '1d' });
}
