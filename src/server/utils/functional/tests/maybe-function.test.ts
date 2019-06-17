import maybeFunction from '../maybe-function';

test('maybeFunction', () => {
    expect(maybeFunction(async () => {}).isSome()).toEqual(true);
    expect(maybeFunction(() => {}).isSome()).toEqual(true);

    expect(maybeFunction('a').isNone()).toEqual(true);
    expect(maybeFunction(1).isNone()).toEqual(true);
    expect(maybeFunction([]).isNone()).toEqual(true);
    expect(maybeFunction({}).isNone()).toEqual(true);
    expect(maybeFunction(true).isNone()).toEqual(true);
});
