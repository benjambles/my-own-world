import { always, cond, equals, T } from 'ramda';

/**
 * Converts swagger parameter types to JOI validation types
 * @param type
 */
const swaggerToJoiType = (type: string): string =>
    cond([
        [equals('token'), always('string')],
        [equals('integer'), always('number')],
        [equals('int64'), always('integer')],
        [T, _type => '' + _type]
    ])(type);

export default swaggerToJoiType;
