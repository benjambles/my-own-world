import { reduce } from 'ramda';

/**
 * Takes a reducing function and an initial value, and returns a function that reduces the entries of the
 * object provided.
 * @param fn - A reducing function
 * @param acc - The initial value
 */
const reduceEntries = <T>(fn: (T, any) => T, acc: T) => obj => reduce(fn, acc, Object.entries(obj));
export default reduceEntries;
