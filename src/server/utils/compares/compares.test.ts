import 'jest';
import { isAdmin, isTrue, isUser, isValidUuid } from './index';

test('isAdmin', () => {
    const tests = [[true, { user: { userData: true } }], [false, { user: false }]];

    tests.forEach(([result, data]) => {
        expect(isAdmin(data)).toBe(result);
    });
});

test('isUser', () => {
    const tests = [[true, { userData: true }], [false, {}]];

    tests.forEach(([result, data]) => {
        expect(isUser(data)).toBe(result);
    });
});

test('isTrue', () => {
    const tests = [
        [true, true],
        [true, 1],
        [true, 'hello'],
        [true, ['hello']],
        [true, {}],
        [true, []],
        [false, false],
        [false, 0],
        [false, '']
    ];

    tests.forEach(([result, data]) => {
        expect(isTrue(data)).toBe(result);
    });
});

test('isValidUuid', () => {
    const tests = [[true, '38ef3e09-cdcd-543c-bc39-c7b4f21db98d'], [false, 'not-a-uid']];

    tests.forEach(([result, data]) => {
        expect(isValidUuid(data as string)).toBe(result);
    });
});
