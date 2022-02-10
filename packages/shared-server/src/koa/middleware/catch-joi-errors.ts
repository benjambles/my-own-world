import { stringifyJSON } from '../../utils/data/json.js';
import { badResponseError } from '../../utils/errors.js';
import { maybeProp } from '../../utils/functional/maybe-prop.js';
import { getErrorMessage } from '../../utils/joi/get-error-message.js';

/**
 * Custom error handling middleware to format JOI errors into JSON errors instead of default text.
 * @param ctx Koa context
 * @param next Next middleware to call if validation passes
 */
export async function catchJoiErrors(ctx, next) {
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
}
