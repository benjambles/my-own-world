import { getUUID, isValidUUID } from '../uuid.js';

test('getUUID', () => {
    const result = getUUID('95fe5ad9-4f5b-4683-a902-747aaa31e00f', 'test value');
    const result2 = getUUID('95fe5ad9-4f5b-4683-a902-747aaa31e00f', 'test value');

    expect(result).toEqual(result2);
    expect(result).toMatch(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/);
});

test('isValidUUID', () => {
    const tests = [
        [true, '38ef3e09-cdcd-543c-bc39-c7b4f21db98d'],
        [false, 'not-a-uid'],
    ];

    tests.forEach(([result, data]) => {
        expect(isValidUUID(data as string)).toBe(result);
    });
});
