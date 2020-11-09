import { resolve } from 'path';
import { isDirectory, maybeIsDirectory } from '../is-directory';

test('isDirectory', () => {
    const tests = [
        [false, resolve(__dirname, 'mocks/mock-module.js')],
        [true, resolve(__dirname, 'mocks')],
    ];

    tests.forEach(([result, filePath]) => {
        expect(isDirectory(filePath as string)).toEqual(result);
    });
});

test('maybeIsDirectory', () => {
    const fail = maybeIsDirectory(resolve(__dirname, 'mocks/mock-module.js'));
    expect(fail.isEmpty);

    const passPath = resolve(__dirname, 'mocks');
    const pass = maybeIsDirectory(passPath);
    expect(pass.isDefined);
    pass.map((val) => {
        expect(val).toEqual(passPath);
    });
});
