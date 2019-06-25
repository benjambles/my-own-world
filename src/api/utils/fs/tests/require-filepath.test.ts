import requireFilePath from '../require-filepath';

test('requireFilePath', () => {
    const tests = [['value', __dirname, 'mocks/mock-module.js'], ['error', __dirname, 'mocks']];

    tests.forEach(([result, basePath, filePath]) => {
        expect(
            requireFilePath(filePath)(basePath)
                .run()
                .fold(() => 'error', resp => resp.test)
        ).toEqual(result);
    });
});
