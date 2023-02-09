import { KoaError } from '../../koa/middleware/catch-joi-errors.js';

/**
 *
 * @param error
 */
export function getErrorMessage(error: KoaError) {
    return 'details' in error
        ? error.details.map(({ message, path }) => ({ message, path }))
        : error.msg;
}
