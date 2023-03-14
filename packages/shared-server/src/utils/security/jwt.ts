import jwt from 'jsonwebtoken';
import { hmac } from './encryption.js';

/**
 * Generates a jwt format string for use as an auth token
 * @param data Object representing the data to be stored for later user
 */
export function getToken(jwtSecret: string, data: object, jwtId: string): string {
    return jwt.sign(data, jwtSecret, { expiresIn: '15m', jwtid: jwtId });
}

/**
 * Generates a jwt format string for use as an auth token
 * @param data Object representing the data to be stored for later user
 */
export function getRefreshToken(jwtSecret: string, data: object, jwtId: string): string {
    return jwt.sign(data, jwtSecret, { expiresIn: '1d', jwtid: jwtId });
}

export function getAuthTokens(
    { ENC_SECRET, JWT_SECRET },
    data: object,
    fingerprint: string,
) {
    const hashedId = hmac(ENC_SECRET, fingerprint);

    const refreshToken = getRefreshToken(JWT_SECRET, data, hashedId);
    const accessToken = getToken(JWT_SECRET, data, hashedId);

    return { accessToken, fingerprint, refreshToken };
}

export function parseToken(jwtSecret: string, token: string) {
    return jwt.verify(token, jwtSecret);
}

export function verifyRefreshToken(
    { ENC_SECRET, JWT_SECRET },
    refreshToken: string,
    fingerprint: string,
) {
    const parsedToken = parseToken(JWT_SECRET, refreshToken);

    if (typeof parsedToken === 'string') {
        throw new Error('Invalid JWT payload');
    }

    const hashedId = hmac(ENC_SECRET, fingerprint);

    if (parsedToken.fingerprint !== hashedId) {
        throw new Error('The fingerprint does not match expected value');
    }

    return parsedToken;
}
