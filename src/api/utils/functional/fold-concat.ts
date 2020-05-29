import { concat } from 'ramda';

export const foldConcat = (acc, foldable) => foldable.fold(acc, concat(acc));
