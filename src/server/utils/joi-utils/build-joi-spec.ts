import * as R from 'ramda';
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
export default function buildJoiSpec(joi, { parameters = [], consumes = [] }) {
    const spec = parameters.reduce(
        (acc, paramConf: swaggerParam) =>
            R.assocPath(R.props(['in', 'name'], paramConf), buildParameter(joi, paramConf), acc),
        { continueOnError: true }
    );

    if (R.prop('body', spec) && consumes.length > 0) {
        spec.type = R.head(consumes).split('/')[1];
    }

    return spec;
}

/**
 * Converts a swagger parameter definition into a Joi validation schema
 * @param paramConf Swagger parameter definition
 */
function buildParameter(joi, { type, values, format, opts = {} }: swaggerParam): Function {
    const getFormatType = format => (format ? [swaggerToJoiType(format), true] : null);
    const getChildValidators = (type, values) =>
        R.equals(type, 'array') && Array.isArray(values) && values.length
            ? ['items', values.map(value => buildParameter(joi, value))]
            : null;

    return [
        [swaggerToJoiType(type), true],
        getFormatType(format),
        ...Object.entries(opts),
        getChildValidators(type, values)
    ].reduce((acc, validator: swaggerTypeConfig) => {
        if (R.isNil(validator)) return acc;

        const [name, value] = validator;
        return value === true ? acc[name]() : acc[name](value);
    }, joi);
}
