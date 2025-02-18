import jwt, { JwtPayload } from 'jsonwebtoken';
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
    const hashedId = hmac(ENC_SECRET, fingerprint);

    return jwt.verify(refreshToken, JWT_SECRET, { jwtid: hashedId }) as JwtPayload;
}

export function getJwtFromCookie(ctx, cookieName): string {
    const authCookie = ctx.cookies.get(cookieName);

    if (!authCookie) {
        throw new Error('No bearer token found');
    }

    try {
        parseToken(ctx.state.env.JWT_SECRET, authCookie);
        return authCookie;
    } catch {
        throw new Error('Invalid access token');
    }
}
