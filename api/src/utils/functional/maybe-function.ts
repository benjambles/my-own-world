import { fromPredicate, Option } from 'fp-ts/lib/Option';
import { Middleware } from 'koa';
import { isFunction } from 'ramda-adjunct';

type MaybeFunction = (value: unknown) => Option<Function>;

/**
 * Returns an Option which is a some if the value passed is a function
 * Otherwise a none.
 *
 * @param value
 */
export const maybeFunction: MaybeFunction = fromPredicate(isFunction);

const isMiddleware = (fn): fn is Middleware => {
    return typeof fn === 'function' && fn.constructor.name === 'AsyncFunction' && fn.length === 2;
};

export const maybeMiddleware = fromPredicate(isMiddleware);
