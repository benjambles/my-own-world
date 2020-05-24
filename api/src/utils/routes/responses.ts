import { propOr } from 'ramda';
import { responseStatuses } from '../../config';
import { maybeProp } from '../functional/maybe-prop';

/**
 * Structures an API response
 * @param {object} body - The content of the response
 * @param {object} meta - Useful information pertaining to the response
 */
export const partsResponse = (body = {}, meta = {}): ApiResponse => {
    return {
        parts: {
            body,
            meta,
        },
    };
};

/**
 * Structure for a response that should be just sent as is
 * @param {object} data
 */
export const dataResponse = (data): ApiResponse => {
    return { data };
};

/**
 *
 * @param response
 */
export const getResponseBody = (response, status) => {
    return maybeProp('parts', response).foldL(
        () => propOr('', 'data', response),
        ({ meta = {}, body = {} }) => ({
            meta: {
                ...meta,
                status,
                message: responseStatuses.success,
            },
            body,
        })
    );
};
