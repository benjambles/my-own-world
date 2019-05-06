import * as Maybe from 'folktale/maybe';

/**
 * Returns a Maybe.Just of an array if it is filled, otherwise Maybe.Nothing
 * @param maybeArr - A maybe of an array
 */
const getFilledArray = maybeArr =>
    maybeArr.chain(arr => (arr.length ? Maybe.Just(arr) : Maybe.Nothing()));

export default getFilledArray;
