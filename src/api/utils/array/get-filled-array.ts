import { Option, some, none, fromPredicate } from 'fp-ts/lib/Option';
import hasValues from './has-values';

/**
 * Returns a Some of an array if it is filled, otherwise None
 * @param optionArray - An option of an array
 */
export default function getFilledArray<A>(optArr: Option<A[]>) {
    return optArr.chain(fromPredicate(hasValues));
}
