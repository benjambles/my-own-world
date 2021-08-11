export function sum(...nums: number[]): number {
    return nums.reduce((a, b) => a + b, 0);
}

/**
 * Function that given a max, min and initial value will
 * return a value that doesn't break out of those bounds
 * @param min - The lowest possible value
 * @param max - The highest possible value
 * @param value - The number to be capped
 */
export function clamp(min: number, max: number, value: number): number {
    return Math.max(min, Math.min(value, max));
}

/**
 * Function that given a max, change value and initial value will
 * return a value that doesn't go above the max value.
 * Negative increment values have no effect.
 * @param max - The highest possible value
 * @param offset - The value to add to the target
 * @param initialValue - The value to be increased
 */
export function cappedAdd(max: number, offset: number, initialValue: number): number {
    return Math.min(initialValue + Math.max(offset, 0), max);
}
/**
 * Function that given a min, change value and initial value will
 * return a value that doesn't go below the min value.
 * Negative decremement values have no effect.
 * @param min - The lowest possible value
 * @param offset - The value to subtract from the target
 * @param initialValue - The value to be decreased
 */
export function cappedSubtract(min: number, offset: number, initialValue: number): number {
    return Math.max(initialValue - Math.max(offset, 0), min);
}
