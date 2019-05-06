import requireFilePath from '../require-filepath';

test('requireFilePath', () => {
    const tests = [['value', __dirname, 'mocks/mock-module.js'], ['error', __dirname, 'mocks']];

    tests.forEach(([result, basePath, filePath]) => {
        expect(
            requireFilePath(basePath, filePath)
                .map(resp => resp.test)
                .getOrElse('error')
        ).toEqual(result);
    });
});
