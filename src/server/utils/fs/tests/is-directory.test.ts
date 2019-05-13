import { isDirectory, maybeIsDirectory } from '../is-directory';
import { resolve } from 'path';

test('isDirectory', () => {
    const tests = [
        [false, resolve(__dirname, 'mocks/mock-module.js')],
        [true, resolve(__dirname, 'mocks')]
    ];

    tests.forEach(([result, filePath]) => {
        expect(isDirectory(filePath as string)).toEqual(result);
    });
});

test.todo('maybeIsDirectory');
