import { isGte, isLte } from './numbers.js';

export function isBetween<T extends { length: number }>(
    minLength: number,
    maxLength: number,
    value: T,
) {
    return isLongEnough(minLength, value) && isShortEnough(maxLength, value);
}

export function isLongEnough<T extends { length: number }>(minLength: number, value: T) {
    return isGte(minLength, value.length);
}

export function isShortEnough<T extends { length: number }>(maxLength: number, value: T) {
    return isLte(maxLength, value.length);
}
