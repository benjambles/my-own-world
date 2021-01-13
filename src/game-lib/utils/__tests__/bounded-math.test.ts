import { capBetween, cappedAdd, cappedSubtract } from '../math';

test('capBetween', () => {
    expect(capBetween(0, 10, 11)).toEqual(10); // Can't go above
    expect(capBetween(0, 10, -2)).toEqual(0); // Can't go below
    expect(capBetween(0, 10, 5)).toEqual(5);

    expect(capBetween(0, 10, Infinity)).toEqual(10); // Infinity doesn't break it
});

test('cappedAdd', () => {
    expect(cappedAdd(10, 2, 9)).toEqual(10); // Can't go above
    expect(cappedAdd(10, -2, 9)).toEqual(9); // Can't subtract
    expect(cappedAdd(10, 2, 3)).toEqual(5);
    expect(cappedAdd(Infinity, 1, Infinity)).toEqual(Infinity); // Infinity doesn't break it!
});

test('cappedSubtract', () => {
    expect(cappedSubtract(0, -2, 9)).toEqual(9); // Can't accidently add
    expect(cappedSubtract(0, 3, 2)).toEqual(0); // Can't go below
    expect(cappedSubtract(0, 2, 9)).toEqual(7);
});
