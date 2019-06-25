import getOrElse from '../get-or-else';
import { some, none } from 'fp-ts/lib/Option';

test('getOrElse', () => {
    const tests = [['default', none], ['value1', some('value1')]];

    tests.forEach(([result, data]) => {
        expect(getOrElse('default')(data)).toEqual(result);
    });
});
