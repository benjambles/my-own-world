import { option, Option, some } from 'ts-option';
import { maybeFunction } from './maybe-function';

/**
 * Takes a property name, and an object and returns an Option of the result
 * @param propName
 * @param obj
 */
export const maybeProp = (propName: string, obj) => {
    return option(obj[propName]);
};

/**
 * Takes a property name, and an object, and a fallback value and returns a some of the result
 * @param or
 * @param propName
 * @param obj
 */
export const maybePropOr = <T>(or: T, propName: string, obj: Record<string, any>): Option<T> => {
    return maybeProp(propName, obj).orElseValue(some(or));
};

/**
 * Takes an object and returns a function that takes a property name as a string
 * If the property is found on the object, and is a function a some<function> is returned.
 * Otherwise a none.
 * @param obj
 */
export const maybePropIsFn = (propName: string, obj): Option<Function> => {
    return maybeProp(propName, obj).flatMap(maybeFunction);
};
