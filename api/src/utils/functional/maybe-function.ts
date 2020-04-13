import { none, some } from 'fp-ts/lib/Option';
import { isFunction } from 'ramda-adjunct';

/**
 * Returns an Option which is a some if the value passed is a function
 * Otherwise a none.
 *
 * @param value
 */
export default function maybeFunction(value) {
    return isFunction(value) ? some(value) : none;
}
