/**
 * Takes a reducing function and an initial value, and returns a function that
 * reduces the entries of the object provided.
 * @param fn - A reducing function
 * @param acc - The initial value
 */
export const reduceEntries = <T>(fn: (acc: T, value: any) => T, acc: T) => {
    return (obj: Object): T => Object.entries(obj).reduce(fn, acc);
};
