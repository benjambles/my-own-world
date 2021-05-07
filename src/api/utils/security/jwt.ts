import jwt from 'jsonwebtoken';

/**
 * Generates a jwt format string for use as an auth token
 * @param data Object representing the data to be stored for later user
 */
export const getToken = async (jwtSecret: string, data: object): Promise<string> => {
    return jwt.sign(data, jwtSecret, { expiresIn: '1d' });
};
