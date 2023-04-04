import { wrap } from '../arrays.js';

test('wrap', () => {
    const tests = [
        [null, [null]],
        [[1], [1]],
        [1, [1]],
        [[], []],
        ['string', ['string']],
    ];

    tests.forEach(([testCase, expectedResult]) =>
        expect(wrap(testCase)).toEqual(expectedResult),
    );
});
