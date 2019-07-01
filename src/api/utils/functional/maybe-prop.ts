import { fromNullable, some } from 'fp-ts/lib/Option';
import { prop } from 'ramda';
import maybeFunction from './maybe-function';

/**
 * Takes a property name, and an object and returns an Option of the result
 * @param propName
 * @param obj
 */
export function maybeProp(propName: string, obj) {
    return fromNullable(prop(propName, obj));
}

/**
 * Takes a property name, and an object, and a fallback value and returns a some of the result
 * @param or
 * @param propName
 * @param obj
 */
export function maybePropOr(or, propName: string, obj) {
    return maybeProp(propName, obj).alt(some(or));
}

/**
 * Takes an object and returns a function that takes a property name as a string
 * If the property is found on the object, and is a function a some<function> is returned.
 * Otherwise a none.
 * @param obj
 */
export function maybePropIsFn(propName: string, obj: fnMap) {
    return maybeProp(propName, obj).chain(maybeFunction);
}
