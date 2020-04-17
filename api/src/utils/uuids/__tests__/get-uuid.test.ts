import getUUID from '../get-uuid';

test('getUUID', () => {
    const result = getUUID('test value');
    const result2 = getUUID('test value');

    expect(result).toEqual(result2);
    expect(result).toMatch(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/);
});
