import * as uuidv5 from 'uuid/v5';
import { uuidv5_NS } from '../../config';

/**
 * Return a namespaced UUID using UUIDv5
 * @param value A value to convert into a namespaced uuidv5 string
 */
const getUUID = (value: string): string => uuidv5(value, uuidv5_NS);

export default getUUID;
