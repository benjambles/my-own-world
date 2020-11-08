import { fromNullable, some } from 'fp-ts/lib/Option';
import { Middleware } from 'koa';
import { maybeFunction, maybeMiddleware } from './maybe-function';

export interface FnMap {
    [name: string]: Middleware;
}

/**
 * Takes a property name, and an object and returns an Option of the result
 * @param propName
 * @param obj
 */
export const maybeProp = (propName: string, obj) => fromNullable(obj[propName]);

/**
 * Takes a property name, and an object, and a fallback value and returns a some of the result
 * @param or
 * @param propName
 * @param obj
 */
export const maybePropOr = (or, propName: string, obj) => maybeProp(propName, obj).alt(some(or));

/**
 * Takes an object and returns a function that takes a property name as a string
 * If the property is found on the object, and is a function a some<function> is returned.
 * Otherwise a none.
 * @param obj
 */
export const maybePropIsFn = (propName: string, obj: FnMap) => {
    return maybeProp(propName, obj).chain(maybeFunction);
};

/**
 * Takes an object and returns a function that takes a property name as a string
 * If the property is found on the object, and is a function a some<function> is returned.
 * Otherwise a none.
 * @param obj
 */
export const maybePropIsMiddleware = (propName: string, obj: FnMap) => {
    return maybeProp(propName, obj).chain(maybeMiddleware);
};
