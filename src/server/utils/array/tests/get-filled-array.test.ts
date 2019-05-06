import getFilledArray from '../get-filled-array';
import * as Maybe from 'folktale/maybe';

test('getFilledArray', () => {
    const tests = [[Maybe.of([]), false], [Maybe.of([1]), [1]]];

    tests.forEach(([mArr, result]) =>
        expect(getFilledArray(mArr).getOrElse(false)).toEqual(result)
    );
});
