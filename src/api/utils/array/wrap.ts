/**
 * Wraps a value in an array if it isn't already one
 * @param value
 */
export const wrap = <T>(value: T) => (Array.isArray(value) ? value : [value]);
