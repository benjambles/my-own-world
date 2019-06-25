import * as Koa from 'koa';
import { assoc } from 'ramda';
import reduceEntries from '../array/reduce-entries';
import { maybeProp } from '../functional/maybe-prop';
import getErrorMessage from '../joi-utils/get-error-message';
import { stringifyJSON, toError } from 'fp-ts/lib/Either';

/**
 * Custom error handling middleware to format JOI errors into JSON errors instead of default text.
 * @param ctx Koa context
 * @param next Next middleware to call if validation passes
 */
export default async function catchJoiErrors(
    ctx: Koa.Context,
    next: () => Promise<any>
): Promise<void> {
    maybeProp('invalid', ctx)
        .map(reduceEntries((acc, [key, error]) => assoc(key, getErrorMessage(error), acc), {}))
        .map(data => stringifyJSON(data, toError).value)
        .map(message => {
            ctx.throw(message, 400);
        });

    await next();
}
