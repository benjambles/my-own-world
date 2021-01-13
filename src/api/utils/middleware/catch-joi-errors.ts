import { Middleware } from 'koa';
import { stringifyJSON } from '../data/json';
import { badResponseError } from '../errors/errors';
import { maybeProp } from '../functional/maybe-prop';
import { getErrorMessage } from '../joi-utils/get-error-message';

/**
 * Custom error handling middleware to format JOI errors into JSON errors instead of default text.
 * @param ctx Koa context
 * @param next Next middleware to call if validation passes
 */
export const catchJoiErrors: Middleware = async (ctx, next) => {
    maybeProp('invalid', ctx)
        .map((errors) => {
            return Object.fromEntries(
                Object.entries(errors).map(([key, error]) => {
                    return [key, getErrorMessage(error)];
                }),
            );
        })
        .flatMap(stringifyJSON)
        .map(badResponseError(ctx));

    await next();
};
