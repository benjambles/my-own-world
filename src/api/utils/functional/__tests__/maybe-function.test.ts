import { maybeFunction } from '../maybe-function';

test('maybeFunction', () => {
    expect(maybeFunction(async () => {}).isDefined).toEqual(true);
    expect(maybeFunction(() => {}).isDefined).toEqual(true);

    expect(maybeFunction('a').isEmpty).toEqual(true);
    expect(maybeFunction(1).isEmpty).toEqual(true);
    expect(maybeFunction([]).isEmpty).toEqual(true);
    expect(maybeFunction({}).isEmpty).toEqual(true);
    expect(maybeFunction(true).isEmpty).toEqual(true);
});
