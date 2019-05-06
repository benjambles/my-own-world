import getStringParts from '../get-string-parts';

type test = [string, string, string[]];

test('getStringParts', () => {
    const tests: test[] = [
        ['', '.', []],
        ['.', '.', []],
        [',', ',', []],
        ['a.test.string', '.', ['a', 'test', 'string']],
        ['a..string', '.', ['a', 'string']],
        ['a.string.', '.', ['a', 'string']]
    ];

    tests.forEach(([str, del, result]) => expect(getStringParts(del, str)).toEqual(result));
});
