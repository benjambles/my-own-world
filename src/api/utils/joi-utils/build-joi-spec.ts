import { wrap } from '../array/wrap';
import { swaggerToJoiType } from './swagger-to-joi-type';

interface SwaggerParam {
    name: string;
    in: string;
    description: string;
    required: boolean;
    type: string;
    format: string;
    opts?: SwaggerParamOpts;
    values: SwaggerParam[];
}

interface SwaggerParamOpts {
    lowercase?: boolean;
    email?: boolean;
    max?: number;
    min?: number;
}

type SwaggerTypeConfig = [string, any] | null;

/**
 * Creates the validate spec object required by JOI routers
 * Converts:
 * {
 *  "name": "email",
 *  "in": "body",
 *  "description": "The email address of the user wishing to log in",
 *  "required": true,
 *  "type": "string".
 *  "opts": {
 *      "lowercase": true,
 *      "email": true
 *  }
 * }
 *
 * In to:
 * email: Joi.string().required().lowercase().email()
 *
 *
 * @param config
 */
export const buildJoiSpec = (joi, { parameters, consumes }) => {
    const spec = parameters.reduce((acc, paramConf: SwaggerParam) => {
        acc[paramConf.in] = acc[paramConf.in] || {};
        acc[paramConf.in][paramConf.name] = buildParameter(joi, paramConf);
        return acc;
    }, {});

    if (spec.body && consumes.length) {
        const [, consumeFormat] = consumes[0].split('/');
        spec.type = consumeFormat;
    }

    return spec;
};

/**
 * Converts a swagger parameter definition into a Joi validation schema
 * @param paramConf Swagger parameter definition
 */
const buildParameter = (joi, { type, values, format, opts = {} }: SwaggerParam): Function => {
    const getFormatType = (format) => (format ? [swaggerToJoiType(format), true] : null);
    const getChildValidators = (type, values) => {
        return type === 'array' && Array.isArray(values) && values.length
            ? ['items', values.map((value) => buildParameter(joi, value))]
            : null;
    };

    return [
        [swaggerToJoiType(type), true],
        getFormatType(format),
        ...Object.entries(opts),
        getChildValidators(type, values),
    ].reduce((acc, validator: SwaggerTypeConfig) => {
        if (!validator) return acc;

        const [name, value] = validator;
        return value === true ? acc[name]() : acc[name](...wrap(value));
    }, joi);
};
