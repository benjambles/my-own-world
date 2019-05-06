import isValidUUID from '../is-valid-uuid';

test('isValidUUID', () => {
    const tests = [[true, '38ef3e09-cdcd-543c-bc39-c7b4f21db98d'], [false, 'not-a-uid']];

    tests.forEach(([result, data]) => {
        expect(isValidUUID(data as string)).toBe(result);
    });
});
