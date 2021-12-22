/**
 * Wraps a value in an array if it isn't already one
 * @param value
 */
export function wrap<T>(value: T) {
    return Array.isArray(value) ? value : [value];
}
