import { Option, some } from 'ts-option';
import { getFilledArray } from '../get-filled-array';

interface testParams extends Array<any> {
    [index: number]: [Option<any[]>, any];
}

test('getFilledArray', () => {
    const tests: testParams = [
        [some([]), false],
        [some([1]), true],
    ];

    tests.forEach(([mArr, result]) => expect(getFilledArray(mArr).isDefined).toEqual(result));
});
