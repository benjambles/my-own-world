import * as Maybe from 'folktale/maybe';
import { prop } from 'ramda';

/**
 * Takes a property name, and an object and returns a Maybe of the result
 * @param propName
 * @param obj
 */
const maybeProp = (propName: string, obj) => Maybe.fromNullable(prop(propName, obj));

export default maybeProp;
