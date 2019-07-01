import hasValues from '../has-values';

test('hasValues', () => {
    expect(hasValues([])).toEqual(false);
    expect(hasValues([1])).toEqual(true);
    expect(hasValues([, ,])).toEqual(true);
    expect(hasValues(Array.from({ length: 5 }))).toEqual(true);
});
