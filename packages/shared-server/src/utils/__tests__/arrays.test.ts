import { Option, some } from 'ts-option';
import { getFilledArray, wrap } from '../arrays.js';

test('wrap', () => {
    const tests = [
        [null, [null]],
        [[1], [1]],
        [1, [1]],
        [[], []],
        ['string', ['string']],
    ];

    tests.forEach(([testCase, expectedResult]) => expect(wrap(testCase)).toEqual(expectedResult));
});

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
