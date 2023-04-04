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
