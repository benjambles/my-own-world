import { v5 } from 'uuid';

/**
 * Return a namespaced UUID using UUIDv5
 * @param value A value to convert into a namespaced uuidv5 string
 */
export function getUUID(uuidv5NameSpace: string, value: string): string {
    return v5(value, uuidv5NameSpace);
}

/**
 * Check to see if the provided value is a valid uuid string
 * @param uuid a string to test for validity
 */
export function isValidUUID(uuid: string): boolean {
    const re = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
    return re.test(uuid);
}
