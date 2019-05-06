import isUser from '../is-user';

test('isUser', () => {
    const tests = [[true, { state: { user: true } }], [false, {}]];

    tests.forEach(([result, data]) => {
        expect(isUser(data)).toBe(result);
    });
});
