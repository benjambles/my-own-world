import { always, cond, equals, T, identity } from 'ramda';

/**
 * Converts swagger parameter types to JOI validation types
 * @param type
 */
export default function swaggerToJoiType(type: string): string {
    return cond([
        [equals('token'), always('string')],
        [equals('integer'), always('number')],
        [equals('int64'), always('integer')],
        [T, identity],
    ])(type);
}
