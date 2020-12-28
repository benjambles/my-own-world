interface APIMeta {
    message?: string;
    lastModified?: string;
    [name: string]: any;
}

export interface PartsResponse {
    parts: {
        body: any;
        meta: APIMeta;
    };
}

export interface DataResponse {
    data: any;
}

/**
 * Structures an API response
 * @param {object} body - The content of the response
 * @param {object} meta - Useful information pertaining to the response
 */
export const partsResponse = (body = {}, meta: APIMeta = {}): PartsResponse => {
    return {
        parts: {
            body,
            meta,
        },
    };
};

/**
 * Structure for a response that should be just sent as is
 * @param data
 */
export const dataResponse = <T>(data?: T): DataResponse => {
    return { data };
};

/**
 *
 * @param response
 */
export const getResponseBody = (response, status): PartsResponse | DataResponse => {
    if (response.parts) {
        return partsResponse(response.parts.body, {
            ...response.parts.meta,
            status,
            message: 'success',
        });
    }

    return dataResponse(response.data);
};
