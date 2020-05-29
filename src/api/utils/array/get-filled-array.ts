import { fromPredicate, Option } from 'fp-ts/lib/Option';
import { isEmpty, complement } from 'ramda';

/**
 * Returns a Some of an array if it is filled, otherwise None
 * @param optionArray - An option of an array
 */
export const getFilledArray = <A>(optArr: Option<A[]>) => {
    return optArr.chain(fromPredicate(complement(isEmpty)));
};
