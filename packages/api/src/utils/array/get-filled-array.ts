import { Option } from 'ts-option';

/**
 * Returns a Some of an array if it is filled, otherwise None
 * @param optionArray - An option of an array
 */
export const getFilledArray = <A>(optArr: Option<A[]>): Option<A[]> => {
    return optArr.filter((arr) => !!arr.length);
};
