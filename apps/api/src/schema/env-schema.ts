import Joi from 'joi';

export type Env = {
    NODE_ENV: string;

    // Server parameters
    HOST: string;
    PORT: string;

    // DB Details
    MONGO_DB: string;
    MONGO_PASSWORD: string;
    MONGO_URL: string;
    MONGO_USER: string;

    // Security
    ENC_SECRET: string;
    JWT_SECRET: string;
    UUIDV5_NS: string;
};

export const envSchema: Joi.PartialSchemaMap<Env> = {
    NODE_ENV: Joi.string()
        .pattern(/^development|staging|production|testing&/)
        .required(),

    // Server parameters
    HOST: Joi.string()
        .ip({ version: ['ipv4', 'ipv6'] })
        .required(),
    PORT: Joi.number().port().required(),

    // DB Details
    MONGO_DB: Joi.string().required(),
    MONGO_PASSWORD: Joi.string().default(''),
    MONGO_URL: Joi.string()
        .uri({
            scheme: ['mongodb'],
        })
        .required(),
    MONGO_USER: Joi.string().default(''),

    // Security
    ENC_SECRET: Joi.string().required(),
    JWT_SECRET: Joi.string().uuid().required(),
    UUIDV5_NS: Joi.string().uuid().required(),
};
