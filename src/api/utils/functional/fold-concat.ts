import { concat } from 'ramda';

export default function foldConcat(acc, foldable) {
    return foldable.fold(acc, concat(acc));
}
