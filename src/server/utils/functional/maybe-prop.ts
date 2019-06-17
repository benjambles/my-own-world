import { fromNullable, some } from 'fp-ts/lib/Option';
import { prop } from 'ramda';
import maybeFunction from './maybe-function';

/**
 * Takes a property name, and an object and returns a Maybe of the result
 * @param propName
 * @param obj
 */
export const maybeProp = (propName: string, obj) => fromNullable(prop(propName, obj));

/**
 *
 * @param or
 * @param propName
 * @param obj
 */
export const maybePropOr = (or, propName: string, obj) => maybeProp(propName, obj).alt(some(or));

/**
 *
 * @param obj
 */
export const maybePropIsFn = (obj: fnMap) => (propName: string) =>
    maybeProp(propName, obj).chain(maybeFunction);
