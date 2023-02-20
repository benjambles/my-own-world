import Koa from 'koa';
import { isAdmin } from '../is-admin.js';

test('isAdmin', () => {
    const tests = [
        [true, { state: { user: { isAdmin: true } } }],
        [false, { state: {} }],
    ];

    tests.forEach(([result, data]) => {
        expect(isAdmin(data as unknown as Koa.Context)).toBe(result);
    });
});
