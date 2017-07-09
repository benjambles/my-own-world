import * as uuidv5 from 'uuid/v5';
import { uuidv5_NS } from '../../lib/config';

/**
 * Deep flatten an array
 * @param arr array of arrays to any depth
 */
export function deepFlatten(arr: any[]): any[] {
    return arr.reduce((acc: any[], val: any) => acc.concat(
        Array.isArray(val) ? deepFlatten(val) : val
    ), []);
}

/**
 * Flatten a 2 dimensional array
 * @param acc accumulator array
 * @param val value to add to the array
 */
export function flatten(acc: any[], val: any): any[] {
    return acc.concat(val);
}

/**
 * Return a namespaced UUID using UUIDv5
 * @param value A value to convert into a namespaced uuidv5 string
 */
export function getUUID(value: string): string {
    return uuidv5(value, uuidv5_NS);
};

/**
 * Check to see if the provided value is a valid uuid string
 * @param uuid a string to test for validity
 * String -> Bool
 */
export function isValidUuid(uuid: string): boolean {
    const re = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/
    return re.test(uuid)
}

/**
 * Checks is given parameter is truthy
 * @param value 
 */
export function isTrue(value: any): boolean {
    return !!value === true;
}

export function isAdmin(token): boolean {
    const userData = token.user;
    return (userData.admin && userData.admin === true);
}