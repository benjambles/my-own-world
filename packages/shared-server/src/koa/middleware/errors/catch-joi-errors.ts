import { Context, Middleware, Next } from 'koa';
import { stringifyJson } from '../../../utils/data/json.js';
import { throwBadResponse } from '../../../utils/errors.js';

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

function formattedThrowOnError(ctx: Context): void | never {
    if (!ctx.invalid) return;

    const errors = stringifyJson(
        Object.fromEntries(
            Object.entries(ctx.invalid).map(([key, error]) => [
                key,
                getErrorMessage(error),
            ]),
        ),
    ).getOrElseValue('There was an error.');

    throwBadResponse(ctx)(errors);
}

type KoaError = { details: { message: string; path: string }[] } | { msg: string };

function getErrorMessage(error: KoaError) {
    return 'details' in error
        ? error.details.map(({ message, path }) => ({ message, path }))
        : error.msg;
}
