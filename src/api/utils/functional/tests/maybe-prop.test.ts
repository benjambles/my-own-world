import { maybeProp } from '../maybe-prop';

test('maybeProp', () => {
    const obj = {
        prop1: true
    };

    expect(maybeProp('prop1', obj).isSome()).toEqual(true);
    expect(maybeProp('prop2', obj).isSome()).toEqual(false);

    expect(maybeProp('prop1', obj).isNone()).toEqual(false);
    expect(maybeProp('prop2', obj).isNone()).toEqual(true);
});
