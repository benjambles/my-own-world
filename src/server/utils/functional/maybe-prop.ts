import { fromNullable, some } from 'fp-ts/lib/Option';
import { prop } from 'ramda';
import maybeFunction from './maybe-function';

/**
 * Takes a property name, and an object and returns a Maybe of the result
 * @param propName
 * @param obj
 */
const maybeProp = (propName: string, obj) => fromNullable(prop(propName, obj));

export default maybeProp;

export const maybePropOr = (or, propName: string, obj) => maybeProp(propName, obj).alt(some(or));

export const maybePropIsFn = (obj: fnMap) => (propName: string) =>
    maybeProp(propName, obj).chain(maybeFunction);
