import maybeProp from './maybe-prop';
import maybeFunction from './maybe-function';

const maybePropIsFn = obj => propName => maybeProp(propName, obj).chain(maybeFunction);
export default maybePropIsFn;
