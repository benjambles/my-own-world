import { clamp, cappedAdd, cappedSubtract, sum } from '../math';

test('sum', () => {
    expect(sum(0)).toEqual(0);
    expect(sum(1)).toEqual(1);
    expect(sum(1, 2)).toEqual(3);
    expect(sum(1, 2, 3, 4, 5, 6, 7, 8, 9)).toEqual(45);
});

test('capBetween', () => {
    expect(clamp(0, 10, 11)).toEqual(10); // Can't go above
    expect(clamp(0, 10, -2)).toEqual(0); // Can't go below
    expect(clamp(0, 10, 5)).toEqual(5);

    expect(clamp(0, 10, Infinity)).toEqual(10); // Infinity doesn't break it
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
