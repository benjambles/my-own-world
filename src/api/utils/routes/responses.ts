/**
 * Structures an API response
 * @param {object} body - The content of the response
 * @param {object} meta - Useful information pertaining to the response
 */
export function partsResponse(body = {}, meta = {}): ApiResponse {
    return {
        parts: {
            body,
            meta
        }
    };
}

/**
 * Structure for a response that should be just sent as is
 * @param {object} data
 */
export function dataResponse(data): ApiResponse {
    return {
        data
    };
}
