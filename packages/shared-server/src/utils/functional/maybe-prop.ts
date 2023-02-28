import { option, Option, some } from 'ts-option';

/**
 * Takes a property name, and an object and returns an Option of the result
 * @param propName
 * @param obj
 */
export function maybeProp(propName: string, obj) {
    return option(obj[propName]);
}

/**
 * Takes a property name, and an object, and a fallback value and returns a some of the result
 * @param or
 * @param propName
 * @param obj
 */
export function maybePropOr<T>(
    or: T,
    propName: string,
    obj: Record<string, any>,
): Option<T> {
    return maybeProp(propName, obj).orElseValue(some(or));
}
