import createRouter from 'koa-joi-router';
import { Param } from './context/request-parameters.js';
import { MethodSchema } from './openapi-to-joi.js';
import { swaggerToJoiType } from './swagger-to-joi-type.js';

/**
 * Creates the validate spec object required by JOI routers
 * Converts:
 * {
 *  "name": "email",
 *  "in": "query",
 *  "description": "The email address of the user wishing to log in",
 *  "required": true,
 *  "schema": {
 *      "type": "string",
 *      "lowercase": true,
 *      "format": "email",
 *  }
 * }
 *
 * In to:
 * email: Joi.string().required().lowercase().email()
 *
 *
 * @param config
 */
export function buildJoiSpec(
    joi,
    { parameters = [], requestBody }: MethodSchema,
): createRouter.Config['validate'] {
    const spec: createRouter.Config['validate'] = parameters?.reduce(
        (acc, paramConf) => {
            const paramIn = paramConf.in === 'path' ? 'params' : paramConf.in;

            acc[paramIn] = acc[paramIn] || {};
            acc[paramIn][paramConf.name] = buildParameter(joi, paramConf);

            return acc;
        },
        { path: undefined, params: undefined },
    );

    if (requestBody) {
        spec.type =
            Object.keys(requestBody.content)[0] === 'application/json'
                ? 'json'
                : undefined;
    }

    return spec;
}

/**
 * Converts a swagger parameter definition into a Joi validation schema
 * @param paramConf Swagger parameter definition
 */
function buildParameter(joi, param: Param) {
    return [
        [param.schema.type, null],
        param.schema.format ? [param.schema.format, null] : null,
        ...Object.entries(param.schema).filter(
            ([key]) => !['type', 'format'].includes(key),
        ),
        param.required ? ['required', null] : null,
    ].reduce((acc, validator: [string, any]) => {
        if (!validator) return acc;

        const [name, value] = toOpenAPIPair(validator);
        return value === null ? acc[name]() : acc[name](value);
    }, joi);
}

function toOpenAPIPair([name, value]: [string, any]) {
    return [swaggerToJoiType(name), ['required'].includes(name) ? null : value];
}
