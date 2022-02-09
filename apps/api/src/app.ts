#!/usr/bin/env node
import { boot } from '@benjambles/mow-server/dist/koa/app.js';
import { parseEnvFile } from '@benjambles/mow-server/dist/utils/env.js';
import Joi from 'joi';
import Koa from 'koa';
import { initConnection } from './db/index.js';
import resources from './resources/index.js';
import { loadRoutes } from './routing/load-routes.js';

interface AppConfig {
    app: Koa;
    db: (params: { user: string; database: string; password: string; url: string }) => Promise<any>;
    envSchema: Joi.PartialSchemaMap<any>;
    paths: {
        base: string;
        env: string;
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
    MONGO_USER: Joi.string().required(),
    MONGO_DB: Joi.string().required(),
    MONGO_PASSWORD: Joi.string().required(),
    MONGO_URL: Joi.string()
        .uri({
            scheme: ['mongodb'],
        })
        .required(),
    JWT_SECRET: Joi.string().uuid().required(),
};

export async function configureApp({ app, db, envSchema, paths }: AppConfig) {
    const env = parseEnvFile(envSchema, paths);

    const dbInstance = await db({
        user: env.MONGO_USER,
        database: env.MONGO_DB,
        password: env.MONGO_PASSWORD,
        url: env.MONGO_URL,
    });
    const routes = loadRoutes(resources, dbInstance, 'api').map((route) => route.middleware());

    return boot({
        app,
        env,
        routes,
        config: {
            isApi: true,
        },
    });
}

configureApp({
    envSchema,
    app: new Koa(),
    db: initConnection,
    paths: {
        base: import.meta.url,
        env: '../../.env',
    },
}).then((listener) => listener());
