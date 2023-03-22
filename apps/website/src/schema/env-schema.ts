import Joi from 'joi';

export type Env = {
    NODE_ENV: string;

    // Server parameters
    HOST: string;
    PORT: string;

    // Security
    JWT_SECRET: string;
};

export const envSchema: Joi.PartialSchemaMap<Env> = {
    NODE_ENV: Joi.string()
        .pattern(/^development|staging|production|testing&/)
        .required(),
    HOST: Joi.string()
        .ip({ version: ['ipv4', 'ipv6'] })
        .required(),
    PORT: Joi.number().port().required(),
    JWT_SECRET: Joi.string().uuid().required(),
};
