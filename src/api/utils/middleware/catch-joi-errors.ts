import { stringifyJSON, toError } from 'fp-ts/lib/Either';
import { fromEither } from 'fp-ts/lib/Option';
import * as Koa from 'koa';
import { assoc } from 'ramda';
import reduceEntries from '../array/reduce-entries';
import { badResponseError } from '../errors/errors';
import { maybeProp } from '../functional/maybe-prop';
import getErrorMessage from '../joi-utils/get-error-message';

/**
 * Custom error handling middleware to format JOI errors into JSON errors instead of default text.
 * @param ctx Koa context
 * @param next Next middleware to call if validation passes
 */
export default async function catchJoiErrors(
    ctx: Koa.ParameterizedContext<any, {}>,
    next: () => Promise<any>
): Promise<void> {
    maybeProp('invalid', ctx)
        .map(reduceEntries((acc, [key, error]) => assoc(key, getErrorMessage(error), acc), {}))
        .chain(data => fromEither(stringifyJSON(data, toError)))
        .map(badResponseError(ctx));

    await next();
}
