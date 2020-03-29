import { some, Option } from 'fp-ts/lib/Option';
import getFilledArray from '../get-filled-array';

type testParams = [Option<any[]>, any];

test('getFilledArray', () => {
    const tests: testParams[] = [
        [some([]), false],
        [some([1]), true],
    ];

    tests.forEach(([mArr, result]) => expect(getFilledArray(mArr).isSome()).toEqual(result));
});
