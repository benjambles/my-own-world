import Joi from 'joi';

export const envSchema: Joi.PartialSchemaMap<any> = {
    NODE_ENV: Joi.string()
        .pattern(/^development|staging|production|testing&/)
        .required(),

    // Server parameters
    HOST: Joi.string()
        .ip({ version: ['ipv4', 'ipv6'] })
        .required(),
    PORT: Joi.number().port().required(),

    // DB Details
    MONGO_USER: Joi.string().default(''),
    MONGO_DB: Joi.string().required(),
    MONGO_PASSWORD: Joi.string().default(''),
    MONGO_URL: Joi.string()
        .uri({
            scheme: ['mongodb'],
        })
        .required(),

    // Security
    JWT_SECRET: Joi.string().uuid().required(),
    UUIDV5_NS: Joi.string().uuid().required(),
    ENC_SECRET: Joi.string().required(),
};
