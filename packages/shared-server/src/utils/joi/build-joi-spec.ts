import Joi from 'joi';
import createRouter from 'koa-joi-router';
import { ObjectSchema, PropertySchemas } from './context/request-body.js';
import { Param } from './context/request-parameters.js';
import { MethodSchema } from './openapi-to-joi.js';
import { swaggerToJoiType } from './swagger-to-joi-type.js';

/** Extract from T those types that has K keys  */
type ExtractByKey<T, K extends keyof any> = T extends infer R
    ? K extends keyof R
        ? R
        : never
    : never;

type KeyofUnion<T> = T extends infer R ? keyof R : never;

declare global {
    interface ObjectConstructor {
        /**
         * Determines whether an object has a property with the specified name.
         * @param o An object.
         * @param v A property name.
         */
        hasOwn<T extends Record<keyof any, any>, K extends KeyofUnion<T>>(
            o: T,
            v: K,
        ): o is ExtractByKey<T, K>;
    }
}

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
    joi: Joi.Root,
    { parameters, requestBody, responses }: MethodSchema,
    validateOutput: boolean = false,
): createRouter.Config['validate'] {
    const isJsonRequest =
        requestBody && Object.keys(requestBody.content)[0] === 'application/json';

    return {
        continueOnError: true,
        output: validateOutput && responses ? undefined : undefined,
        ...(isJsonRequest
            ? {
                  type: 'json',
                  body: parseObject(joi, requestBody.content['application/json'].schema),
              }
            : {}),
        ...parseParameters(joi, parameters),
    };
}

function parseObject(joi: Joi.Root, { properties, required = [] }: ObjectSchema) {
    return Object.fromEntries(
        Object.entries(properties).map(([key, spec]) => {
            return [
                key,
                buildParameter(joi, {
                    required: required?.includes(key),
                    schema: spec,
                }),
            ];
        }),
    );
}

function parseParameters(joi: Joi.Root, parameters: MethodSchema['parameters'] = []) {
    return parameters.reduce(
        (acc, paramConf) => {
            const paramIn = paramConf.in === 'path' ? 'params' : paramConf.in;

            acc[paramIn] = acc[paramIn] || {};
            acc[paramIn][paramConf.name] = buildParameter(joi, paramConf);

            return acc;
        },
        { path: undefined, params: undefined },
    );
}

type ParamOrBodyParam = Param | { required: boolean; schema: PropertySchemas };
/**
 * Converts a swagger parameter definition into a Joi validation schema
 * @param paramConf Swagger parameter definition
 */
function buildParameter(joi: Joi.Root, param: ParamOrBodyParam) {
    const stages =
        param.schema.type === 'object'
            ? [
                  ['object', parseObject(joi, param.schema)],
                  param.required ? ['required', null] : null,
              ]
            : [
                  [param.schema.type, null],
                  Object.hasOwn(param.schema, 'format')
                      ? [param.schema.format, null]
                      : null,
                  Object.hasOwn(param.schema, 'items')
                      ? [
                            'items',
                            buildParameter(joi, {
                                required: false,
                                schema: param.schema.items,
                            }),
                        ]
                      : null,
                  ...Object.entries(param.schema).filter(
                      ([key]) => !['type', 'format', 'items'].includes(key),
                  ),
                  param.required ? ['required', null] : null,
              ];

    return stages.reduce((acc, validator: [string, any]) => {
        if (!validator) return acc;

        const [name, value] = toOpenAPIPair(validator);
        return value === null ? acc[name]() : acc[name](value);
    }, joi);
}

function toOpenAPIPair([name, value]: [string, any]) {
    return [swaggerToJoiType(name), ['required'].includes(name) ? null : value];
}
