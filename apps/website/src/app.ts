#!/usr/bin/env node
import { configureServer } from '@benjambles/mow-server/dist/index.js';
import { loadEnv, validateEnv } from '@benjambles/mow-server/dist/utils/env.js';
import { resolveImportPath } from '@benjambles/mow-server/dist/utils/paths.js';
import Joi from 'joi';
import Koa from 'koa';
import { fileURLToPath } from 'url';
import { routesConfig } from './routes/routes-config.js';

const paths = {
    base: import.meta.url,
    env: '../.env',
    static: '../../../packages/ui/dist/static',
};

export const envSchema: Joi.PartialSchemaMap<any> = {
    NODE_ENV: Joi.string()
        .pattern(/^development|staging|production|testing&/)
        .required(),
    HOST: Joi.string()
        .ip({ version: ['ipv4', 'ipv6'] })
        .required(),
    PORT: Joi.number().port().required(),
    JWT_SECRET: Joi.string().uuid().required(),
};

loadEnv(resolveImportPath(paths.base, paths.env));
const env = validateEnv(envSchema, process.env);

export const serve = configureServer({
    routesConfig,
    app: new Koa(),
    config: {
        env,
        isApi: false,
        helmetConfig: {
            contentSecurityPolicy: {
                directives: {
                    'default-src': ['*'],
                    'script-src-attr': ["'unsafe-inline'"],
                    'upgrade-insecure-requests': [],
                },
            },
        },
        staticPath: resolveImportPath(paths.base, paths.static),
    },
});

if (fileURLToPath(import.meta.url) === process.argv?.[1]) {
    serve();
}
