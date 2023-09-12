export type Filter<T> = (testItem: T, index: number, obj: T[]) => boolean;

export function append<T>(collection: T[], item: T | T[]): T[] {
    return collection.concat(item);
}

export function dedupe<T>(collection: T[]): T[] {
    return [...new Set(collection)];
}

export function find<T, K>(
    filterFn: (value: K) => Filter<T>,
): (collection: T[], value: K) => T {
    return (collection, value) => collection.find(filterFn(value));
}

export function includes<T>(
    filterFn: (value: T) => Filter<T>,
): (collection: T[], item: T) => boolean {
    return (collection, value) => collection.findIndex(filterFn(value)) !== -1;
}

export function remove<T>(
    filterFn: (value: T) => Filter<T>,
): (collection: T[], item: T) => T[] {
    return (collection, value) => collection.filter(filterFn(value));
}
