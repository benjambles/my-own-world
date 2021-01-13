import { getStringParts } from '../get-string-parts';

test('getStringParts', () => {
    expect(getStringParts('.', '')).toEqual([]);
    expect(getStringParts('.', '.')).toEqual([]);
    expect(getStringParts(',', ',')).toEqual([]);
    expect(getStringParts('.', 'a.test.string')).toEqual(['a', 'test', 'string']);
    expect(getStringParts('.', 'a..string')).toEqual(['a', 'string']);
    expect(getStringParts('.', 'a.string.')).toEqual(['a', 'string']);
});
