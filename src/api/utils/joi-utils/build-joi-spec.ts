import { assoc, assocPath, equals, head, isNil, prop, props } from 'ramda';
import { isTrue } from 'ramda-adjunct';
import swaggerToJoiType from './swagger-to-joi-type';
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
export default function buildJoiSpec(joi, { parameters, consumes }) {
    const spec = parameters.reduce(
        (acc, paramConf: swaggerParam) =>
            assocPath(props(['in', 'name'], paramConf), buildParameter(joi, paramConf), acc),
        {}
    );

    if (!prop('body', spec) || !consumes.length) {
        return spec;
    }

    return assoc('type', prop(1, head(consumes).split('/')), spec);
}

/**
 * Converts a swagger parameter definition into a Joi validation schema
 * @param paramConf Swagger parameter definition
 */
function buildParameter(joi, { type, values, format, opts = {} }: swaggerParam): Function {
    const getFormatType = format => (format ? [swaggerToJoiType(format), true] : null);
    const getChildValidators = (type, values) =>
        equals(type, 'array') && Array.isArray(values) && values.length
            ? ['items', values.map(value => buildParameter(joi, value))]
            : null;

    return [
        [swaggerToJoiType(type), true],
        getFormatType(format),
        ...Object.entries(opts),
        getChildValidators(type, values)
    ].reduce((acc, validator: swaggerTypeConfig) => {
        if (isNil(validator)) return acc;

        const [name, value] = validator;
        return isTrue(value) ? acc[name]() : acc[name](value);
    }, joi);
}
