/**
 * Wraps a value in an array if it isn't already one
 * @param value
 */
const wrap = <T>(value: T): T | [T] => (Array.isArray(value) ? value : [value]);
export default wrap;
