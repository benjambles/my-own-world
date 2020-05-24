import { always, cond, equals, T, identity } from 'ramda';
import { strToStr } from '../../typings/data';

/**
 * Converts swagger parameter types to JOI validation types
 * @param type
 */
export const swaggerToJoiType: strToStr = cond([
    [equals('token'), always('string')],
    [equals('integer'), always('number')],
    [equals('int64'), always('integer')],
    [T, identity],
]);
