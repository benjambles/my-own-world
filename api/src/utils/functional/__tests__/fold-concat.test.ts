import foldConcat from '../fold-concat';
import { none, some } from 'fp-ts/lib/Option';

test('foldConcat', () => {
    const acc = [1, 2, 3];

    expect(foldConcat(acc, none)).toEqual(acc);

    expect(foldConcat(acc, some([4]))).toEqual([...acc, 4]);
});