#!/usr/bin/env node
import { configureServer } from '@benjambles/mow-server/dist/index.js';
import { parseEnvFile } from '@benjambles/mow-server/dist/utils/env.js';
import { resolveImportPath } from '@benjambles/mow-server/dist/utils/paths.js';
import Joi from 'joi';
import Koa from 'koa';
import { routesConfig } from './routes/routes-config.js';

interface AppConfig {
    app: Koa;
    envSchema: Joi.PartialSchemaMap<any>;
    paths: {
        base: string;
        env: string;
        static: string;
    };
}

export const envSchema = {
    NODE_ENV: Joi.string()
        .pattern(/^development|staging|production|testing&/)
        .required(),
    HOST: Joi.string()
        .ip({ version: ['ipv4', 'ipv6'] })
        .required(),
    PORT: Joi.number().port().required(),
    JWT_SECRET: Joi.string().uuid().required(),
};

export async function getListener({ app, paths, envSchema }: AppConfig) {
    const env = parseEnvFile(envSchema, paths);

    return configureServer({
        app,
        env,
        routesConfig,
        config: {
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
}

getListener({
    envSchema,
    app: new Koa(),
    paths: {
        base: import.meta.url,
        env: '../.env',
        static: '../../../packages/ui/dist/static',
    },
}).then((listener) => listener());
