import { Option, some, none } from 'fp-ts/lib/Option';

/**
 * Returns a Maybe.Just of an array if it is filled, otherwise Maybe.Nothing
 * @param maybeArr - A maybe of an array
 */
const getFilledArray = (maybeArr: Option<any[]>) =>
    maybeArr.chain(arr => (arr.length ? some(arr) : none));

export default getFilledArray;
