import type { Middleware } from 'koa';
import { option, Option } from 'ts-option';

/**
 * Returns an Option which is a some if the value passed is a function
 * Otherwise a none.
 *
 * @param value
 */
export function maybeFunction(fn): Option<Function> {
    return option(fn).filter(isFunction);
}

export function maybeMiddleware(fn): Option<Middleware> {
    return option(fn).filter(isMiddleware);
}

function isMiddleware(fn): fn is Middleware {
    return typeof fn === 'function' && fn.constructor.name === 'AsyncFunction' && fn.length === 2;
}

function isFunction(fn: unknown): fn is Function {
    return typeof fn === 'function';
}
