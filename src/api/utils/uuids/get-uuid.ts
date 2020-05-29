import { v5 } from 'uuid';
import { uuidv5NameSpace } from '../../config';
import type { strToStr } from '../../typings/data';

/**
 * Return a namespaced UUID using UUIDv5
 * @param value A value to convert into a namespaced uuidv5 string
 */
export const getUUID: strToStr = (value) => v5(value, uuidv5NameSpace);
