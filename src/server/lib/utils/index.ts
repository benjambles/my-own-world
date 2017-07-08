import * as uuidv5 from 'uuid/v5';
import { uuidv5_NS } from '../../lib/config';

export function flatten(arr): Array<any> {
    return arr.reduce((acc, val) => acc.concat(
        Array.isArray(val) ? flatten(val) : val
    ), []);
}

/**
 * Return a namespaced UUID using UUIDv5
 * @param value 
 */
export function getUUID(value: string) {
    return uuidv5(value, uuidv5_NS);
};

// String -> Bool
export function isValidUuid(uuid) {
    const re = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/
    return re.test(uuid)
}