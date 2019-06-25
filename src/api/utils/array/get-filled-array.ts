import { Option, some, none } from 'fp-ts/lib/Option';

/**
 * Returns a Some of an array if it is filled, otherwise None
 * @param optionArray - An option of an array
 */
export default function getFilledArray<A>(optArr: Option<A[]>) {
    return optArr.chain(arr => (arr.length ? some(arr) : none));
}
