import { v5 } from 'uuid';

/**
 * Return a namespaced UUID using UUIDv5
 * @param value A value to convert into a namespaced uuidv5 string
 */
export const getUUID = (uuidv5NameSpace: string, value: string): string =>
    v5(value, uuidv5NameSpace);
