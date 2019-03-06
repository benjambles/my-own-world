import { pathEq } from 'ramda';

/**
 * Check to see if the provided value is a valid uuid string
 * @param uuid a string to test for validity
 * String -> Bool
 */
export function isValidUuid(uuid: string): boolean {
    const re = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
    return re.test(uuid);
}

/**
 * Checks is given parameter is truthy
 * @param value
 */
export function isTrue(value: any): boolean {
    return Boolean(value);
}

/**
 *
 * @param token
 */
export function isAdmin(token): boolean {
    return pathEq(['user', 'userData'], true, token);
}

/**
 *
 * @param token
 */
export function isUser(token): boolean {
    return !!token.userData;
}

/**
 * Checks if the supplied value is recognised as a function
 * @param value
 */
export function isFunction(value: any): boolean {
    return typeof value === 'function';
}
