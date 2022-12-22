export function concat<T extends any[]>(arr: T[], value: T | T[]) {
    return arr.concat(value);
}
