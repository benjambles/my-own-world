import * as Maybe from 'folktale/maybe';
import { isFunction } from 'ramda-adjunct';

/**
 *
 * @param value
 */
const maybeFunction = (value: any) => (isFunction(value) ? Maybe.of(value) : Maybe.Nothing());
export default maybeFunction;
