import { Option, option } from 'ts-option';

/**
 * Returns a Some of an array if it is filled, otherwise None
 * @param optionArray - An option of an array
 */
export function getFilledArray<A>(optArr: Option<A[]>): Option<A[]> {
    return optArr.filter((arr) => !!arr.length);
}

export function getValues<T>(arr: Option<T>[]): T[] {
    return arr.filter((val) => val.isDefined).map((val) => val.get);
}

export function maybeHead<T>(arr: T[]): Option<T> {
    return option(arr[0]);
}

/**
 * Takes a reducing function and an initial value, and returns a function that
 * reduces the entries of the object provided.
 * @param fn - A reducing function
 * @param acc - The initial value
 */
export function reduceEntries<T>(fn: (acc: T, value: any) => T, acc: T) {
    return (obj: Object): T => Object.entries(obj).reduce(fn, acc);
}

/**
 * Wraps a value in an array if it isn't already one
 * @param value
 */
export function wrap<T>(value: T): T | T[] {
    return Array.isArray(value) ? value : [value];
}
