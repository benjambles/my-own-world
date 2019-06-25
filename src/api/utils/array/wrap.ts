/**
 * Wraps a value in an array if it isn't already one
 * @param value
 */
export default function wrap<T>(value: T): T | [T] {
    return Array.isArray(value) ? value : [value];
}
