import { maybeProp, maybePropIsFn, maybePropOr } from '../maybe-prop';

test('maybeProp', () => {
    const obj = {
        prop1: 'expected',
    };

    expect(maybeProp('prop1', obj).isDefined).toEqual(true);
    expect(maybeProp('prop1', obj).orNull).toEqual('expected');

    expect(maybeProp('prop2', obj).isEmpty).toEqual(true);
    expect(maybeProp('prop2', obj).orNull).toEqual(null);
});

test('maybePropOr', () => {
    const obj = {
        prop1: 'expected',
    };

    expect(maybePropOr('default', 'prop1', obj).isDefined).toEqual(true);
    expect(maybePropOr('default', 'prop2', obj).isDefined).toEqual(true);

    expect(maybePropOr('default', 'prop1', obj).orNull).toEqual('expected');
    expect(maybePropOr('default', 'prop2', obj).orNull).toEqual('default');
});

test('maybePropIsFn', () => {
    const obj = {
        prop2: () => {},
    };

    expect(maybePropIsFn('prop1', obj).isEmpty).toEqual(true);
    expect(maybePropIsFn('prop2', obj).isDefined).toEqual(true);
});
