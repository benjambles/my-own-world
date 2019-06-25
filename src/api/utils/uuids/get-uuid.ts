import * as uuidv5 from 'uuid/v5';
import { uuidv5NameSpace } from '../../config';

/**
 * Return a namespaced UUID using UUIDv5
 * @param value A value to convert into a namespaced uuidv5 string
 */
export default function getUUID(value: string): string {
    return uuidv5(value, uuidv5NameSpace);
}
