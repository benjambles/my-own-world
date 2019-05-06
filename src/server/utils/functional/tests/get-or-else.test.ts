import getOrElse from '../get-or-else';
import * as Maybe from 'folktale/maybe';

test('getOrElse', () => {
    const tests = [['default', Maybe.empty()], ['value1', Maybe.of('value1')]];

    tests.forEach(([result, data]) => {
        expect(getOrElse('default')(data)).toEqual(result);
    });
});
