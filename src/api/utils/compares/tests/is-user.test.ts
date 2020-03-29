import isUser from '../is-user';
import * as Koa from 'koa';

test('isUser', () => {
    const tests = [
        [true, { state: { user: true } }],
        [false, {}],
    ];

    tests.forEach(([result, data]: [boolean, unknown]) => {
        expect(isUser(data as Koa.Context)).toBe(result);
    });
});
