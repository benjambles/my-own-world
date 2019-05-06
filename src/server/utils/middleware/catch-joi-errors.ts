import * as Koa from 'koa';
import { assoc } from 'ramda';
import reduceEntries from '../array/reduce-entries';
import maybeProp from '../functional/maybe-prop';
import getErrorMessage from '../joi-utils/get-error-message';

/**
 * Custom error handling middleware to format JOI errors into JSON errors instead of default text.
 * @param ctx Koa context
 * @param next Next middleware to call if validation passes
 */
const catchJoiErrors = async (ctx: Koa.Context, next: () => Promise<any>): Promise<any> => {
    maybeProp('invalid', ctx)
        .map(reduceEntries((acc, [key, error]) => assoc(key, getErrorMessage(error), acc), {}))
        .map(message => {
            ctx.throw(JSON.stringify(message), 400);
        });

    await next();
};

export default catchJoiErrors;
