import maybeProp from '../maybe-prop';
import { isSome, isNone } from 'fp-ts/lib/Option';

test('maybeProp', () => {
    const obj = {
        prop1: true
    };

    expect(isSome(maybeProp('prop1', obj))).toEqual(true);
    expect(isSome(maybeProp('prop2', obj))).toEqual(false);

    expect(isNone(maybeProp('prop1', obj))).toEqual(false);
    expect(isNone(maybeProp('prop2', obj))).toEqual(true);
});
