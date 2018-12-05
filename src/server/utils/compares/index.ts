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
    const userData = token.user;
    return userData.admin && userData.admin === true;
}

/**
 *
 * @param token
 */
export function isUser(token): boolean {
    return !!token.userData;
}

/**
 *
 * @param value
 */
export function isDefined(value: any): boolean {
    return typeof value !== undefined;
}

/**
 *
 * @param value
 */
export function isNil(value) {
    return value === null;
}
