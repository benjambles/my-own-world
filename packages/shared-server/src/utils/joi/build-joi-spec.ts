import Joi from 'joi';
import createRouter from 'koa-joi-router';
import { Param } from './context/request-parameters.js';
import { ArraySchema, ObjectSchema, PropertySchemas } from './context/schemas.js';
import { ApiDoc, MethodSchema, Ref } from './openapi-to-joi.js';
import { swaggerToJoiType } from './swagger-to-joi-type.js';

//#region Types
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
//#endregion Types

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
 * Handles Ref schemas
 *
 * @param config
 */
export function buildJoiSpec(
    joi: Joi.Root,
    { parameters, requestBody, responses }: MethodSchema,
    validateOutput: boolean = false,
    components: ApiDoc['components'] = {},
): createRouter.Config['validate'] {
    const isJsonRequest =
        requestBody && Object.keys(requestBody.content)[0] === 'application/json';

    return {
        continueOnError: true,
        output: getResponseValidator(joi, responses, validateOutput, components),
        ...(isJsonRequest
            ? {
                  type: 'json',
                  body: parseBody(
                      joi,
                      requestBody.content['application/json'].schema,
                      components,
                  ),
              }
            : {}),
        ...parseParameters(joi, parameters, components),
    };
}

function getResponseValidator(
    joi: Joi.Root,
    responses: MethodSchema['responses'],
    validateOutput: boolean,
    components: ApiDoc['components'],
) {
    if (!validateOutput) return undefined;

    return Object.entries(responses).reduce((acc, [statusCode, spec]) => {
        if (!spec?.['content']?.['application/json']) {
            return acc;
        }

        acc[statusCode] = {
            body: parseBody(joi, spec['content']['application/json'].schema, components),
        };

        return acc;
    }, {});
}

function parseBody(
    joi: Joi.Root,
    schema: ObjectSchema | ArraySchema | Ref,
    components: ApiDoc['components'],
) {
    const _schema = getSchemaConf(schema, components);

    if (_schema.type === 'object') {
        return joi.object(parseObject(joi, _schema, components)).unknown();
    }

    return buildParameter(joi, { required: false, schema: _schema }, components);
}

function parseObject(
    joi: Joi.Root,
    { properties, required = [] }: ObjectSchema,
    components: ApiDoc['components'],
) {
    return Object.fromEntries(
        Object.entries(properties).map(([key, spec]) => {
            const _spec = getSchemaConf(spec, components);
            return [
                key,
                buildParameter(
                    joi,
                    {
                        required: required?.includes(key),
                        schema: _spec,
                    },
                    components,
                ),
            ];
        }),
    );
}

function parseParameters(
    joi: Joi.Root,
    parameters: MethodSchema['parameters'] = [],
    components: ApiDoc['components'] = {},
) {
    return parameters.reduce(
        (acc, paramConf) => {
            const _paramConf = getParamConf(paramConf, components);
            const paramIn = _paramConf.in === 'path' ? 'params' : _paramConf.in;

            acc[paramIn] = acc[paramIn] || {};
            acc[paramIn][_paramConf.name] = buildParameter(joi, _paramConf, components);

            return acc;
        },
        { path: undefined, params: undefined },
    );
}

type ParamOrBodyParam =
    | Param
    | { required: boolean; schema: Exclude<PropertySchemas, Ref> };
/**
 * Converts a swagger parameter definition into a Joi validation schema
 * @param paramConf Swagger parameter definition
 */
function buildParameter(
    joi: Joi.Root,
    param: ParamOrBodyParam,
    components: ApiDoc['components'],
) {
    const stages =
        param.schema.type === 'object'
            ? [
                  ['object', parseObject(joi, param.schema, components)],
                  param.required ? ['required', null] : null,
                  ['unknown', null],
              ]
            : [
                  [param.schema.type, null],
                  Object.hasOwn(param.schema, 'format')
                      ? [param.schema.format, null]
                      : null,
                  Object.hasOwn(param.schema, 'items')
                      ? [
                            'items',
                            buildParameter(
                                joi,
                                {
                                    required: false,
                                    schema: getSchemaConf(param.schema.items, components),
                                },
                                components,
                            ),
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

//#region Ref Handling
function isParamRef(param: any): param is Ref {
    return (
        typeof param.$ref === 'string' && param.$ref.includes('#/components/parameters/')
    );
}

function getParamConf(param: Ref | Param, componentParams: ApiDoc['components']) {
    if (!isParamRef(param)) {
        return param;
    }

    const paramName = param['$ref'].replace('#/components/parameters/', '');

    if (!componentParams?.parameters[paramName]) {
        throw new Error(`Param configuration is missing for ${paramName}`);
    }

    return componentParams.parameters[paramName];
}

function isSchemaRef(param: any): param is Ref {
    return typeof param.$ref === 'string' && param.$ref.includes('#/components/schemas/');
}

function getSchemaConf(param: PropertySchemas, components: ApiDoc['components']) {
    if (!isSchemaRef(param)) {
        return param;
    }

    const paramName = param['$ref'].replace('#/components/schemas/', '');

    if (!components.schemas?.[paramName]) {
        throw new Error(`Param configuration is missing for ${paramName}`);
    }

    return components.schemas[paramName];
}
//#endregion Ref Handling
