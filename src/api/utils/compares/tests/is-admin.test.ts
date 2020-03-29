import isAdmin from '../is-admin';
import * as Koa from 'koa';

test('isAdmin', () => {
    const tests = [
        [true, { state: { user: { userData: true } } }],
        [false, { user: false }],
    ];

    tests.forEach(([result, data]) => {
        expect(isAdmin(data as Koa.Context)).toBe(result);
    });
});
