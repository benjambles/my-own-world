import { Context, Middleware, Next } from 'koa';
import { stringifyJSON } from '../../utils/data/json.js';
import { badResponseError } from '../../utils/errors.js';
import { maybeProp } from '../../utils/functional/maybe-prop.js';
import { getErrorMessage } from '../../utils/joi/get-error-message.js';

/**
 * Custom error handling middleware to format JOI errors into JSON errors instead of default text.
 * @param ctx Koa context
 * @param next Next middleware to call if validation passes
 */
export function catchJoiErrors(validateOutput: boolean = false): Middleware {
    return async (ctx: Context, next: Next) => {
        formattedThrowOnError(ctx);
        await next();

        if (validateOutput) {
            formattedThrowOnError(ctx);
        }
    };
}

function formattedThrowOnError(ctx: Context) {
    maybeProp('invalid', ctx)
        .map((errors) => {
            return Object.fromEntries(
                Object.entries(errors).map(([key, error]) => [
                    key,
                    getErrorMessage(error),
                ]),
            );
        })
        .flatMap(stringifyJSON)
        .map(badResponseError(ctx));
}
