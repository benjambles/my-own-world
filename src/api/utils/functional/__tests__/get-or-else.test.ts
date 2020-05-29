import { none, some } from 'fp-ts/lib/Option';
import { getOrElse } from '../get-or-else';

test('getOrElse', () => {
    const tests = [
        ['default', none],
        ['value1', some('value1')],
    ];

    tests.forEach(([result, data]) => {
        expect(getOrElse('default')(data)).toEqual(result);
    });
});
