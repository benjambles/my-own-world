import { requireFilePath } from '../require-filepath';

test('requireFilePath', () => {
    expect(requireFilePath(__dirname, 'mocks/mock-module.js').test).toEqual('value');

    expect(() => requireFilePath(__dirname, 'mocks')).toThrowError();
});
