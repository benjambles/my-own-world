import { sign } from 'jsonwebtoken';
import { jwtSecret } from '../../config';

/**
 * Generates a jwt format string for use as an auth token
 * @param data Object representing the data to be stored for later user
 */
export const getToken = async (data: object): Promise<string> => {
    return sign(data, jwtSecret, { expiresIn: '1d' });
};
