import { none, some } from 'fp-ts/lib/Option';
import { isFunction } from 'ramda-adjunct';

/**
 *
 * @param value
 */
const maybeFunction = (value: any) => (isFunction(value) ? some(value) : none);
export default maybeFunction;
