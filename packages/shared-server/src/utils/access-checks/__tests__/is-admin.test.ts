import Koa from 'koa';
import { isAdmin } from '../is-admin.js';

test('isAdmin', () => {
    const tests = [
        [true, { state: { user: { userData: true } } }],
        [false, { user: false }],
    ];

    tests.forEach(([result, data]) => {
        expect(isAdmin(data as unknown as Koa.Context)).toBe(result);
    });
});
