import { getUUID } from '../get-uuid';

test('getUUID', () => {
    const result = getUUID('95fe5ad9-4f5b-4683-a902-747aaa31e00f', 'test value');
    const result2 = getUUID('95fe5ad9-4f5b-4683-a902-747aaa31e00f', 'test value');

    expect(result).toEqual(result2);
    expect(result).toMatch(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/);
});
