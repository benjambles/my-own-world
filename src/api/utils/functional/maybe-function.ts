import { Middleware } from 'koa';
import { isFunction } from 'ramda-adjunct';
import { option, Option } from 'ts-option';

/**
 * Returns an Option which is a some if the value passed is a function
 * Otherwise a none.
 *
 * @param value
 */
export const maybeFunction = (fn): Option<Function> => option(fn).filter(isFunction);

export const maybeMiddleware = (fn): Option<Middleware> => option(fn).filter(isMiddleware);

const isMiddleware = (fn): fn is Middleware => {
    return typeof fn === 'function' && fn.constructor.name === 'AsyncFunction' && fn.length === 2;
};
