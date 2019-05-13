import { some } from 'fp-ts/lib/Option';
import getFilledArray from '../get-filled-array';

test('getFilledArray', () => {
    const tests = [[some([]), false], [some([1]), [1]]];

    tests.forEach(([mArr, result]) =>
        expect(getFilledArray(mArr).getOrElse(false)).toEqual(result)
    );
});
