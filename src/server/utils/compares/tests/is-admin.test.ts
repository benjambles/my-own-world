import isAdmin from '../is-admin';

test('isAdmin', () => {
    const tests = [[true, { state: { user: { userData: true } } }], [false, { user: false }]];

    tests.forEach(([result, data]) => {
        expect(isAdmin(data)).toBe(result);
    });
});
