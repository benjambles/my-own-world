import { maybeProp, maybePropIsFn, maybePropOr } from '../maybe-prop';

test('maybeProp', () => {
    const obj = {
        prop1: 'expected',
    };

    expect(maybeProp('prop1', obj).isSome()).toEqual(true);
    expect(maybeProp('prop1', obj).toNullable()).toEqual('expected');

    expect(maybeProp('prop2', obj).isNone()).toEqual(true);
    expect(maybeProp('prop2', obj).toNullable()).toEqual(null);
});

test('maybePropOr', () => {
    const obj = {
        prop1: 'expected',
    };

    expect(maybePropOr('default', 'prop1', obj).isSome()).toEqual(true);
    expect(maybePropOr('default', 'prop2', obj).isSome()).toEqual(true);

    expect(maybePropOr('default', 'prop1', obj).toNullable()).toEqual('expected');
    expect(maybePropOr('default', 'prop2', obj).toNullable()).toEqual('default');
});

test('maybePropIsFn', () => {
    const obj = {
        prop2: () => {},
    };

    expect(maybePropIsFn('prop1', obj).isNone()).toEqual(true);
    expect(maybePropIsFn('prop2', obj).isSome()).toEqual(true);
});
