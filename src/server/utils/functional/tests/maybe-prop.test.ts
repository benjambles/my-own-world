import maybeProp from '../maybe-prop';
import { Just, Nothing } from 'folktale/maybe';

test('maybeProp', () => {
    const obj = {
        prop1: true
    };

    expect(Just.hasInstance(maybeProp('prop1', obj))).toEqual(true);
    expect(Just.hasInstance(maybeProp('prop2', obj))).toEqual(false);

    expect(Nothing.hasInstance(maybeProp('prop1', obj))).toEqual(false);
    expect(Nothing.hasInstance(maybeProp('prop2', obj))).toEqual(true);
});
