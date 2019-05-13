import { concat } from 'ramda';

const foldConcat = (acc, foldable) => foldable.fold(acc, concat(acc));
export default foldConcat;
