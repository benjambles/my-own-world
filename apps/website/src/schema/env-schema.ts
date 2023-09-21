import Joi from 'joi';

export type Env = {
    NODE_ENV: string;

    // Server parameters
    HOST: string;
    PORT: string;
    API_HOST: string;

    // Security
    JWT_SECRET: string;
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
    API_HOST: Joi.string().uri().required(),

    // Security
    JWT_SECRET: Joi.string().uuid().required(),
};
