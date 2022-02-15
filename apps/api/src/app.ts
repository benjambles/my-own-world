#!/usr/bin/env node
import { configureServer } from '@benjambles/mow-server/dist/index.js';
import { loadRoutes } from '@benjambles/mow-server/dist/routing/load-routes.js';
import { initConnection } from '@benjambles/mow-server/dist/utils/db.js';
import { parseEnvFile } from '@benjambles/mow-server/dist/utils/env.js';
import Joi from 'joi';
import Koa from 'koa';
import resources from './resources/index.js';

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
    MONGO_USER: Joi.string().default(''),
    MONGO_DB: Joi.string().required(),
    MONGO_PASSWORD: Joi.string().default(''),
    MONGO_URL: Joi.string()
        .uri({
            scheme: ['mongodb'],
        })
        .required(),
    JWT_SECRET: Joi.string().uuid().required(),
    UUIDV5_NS: Joi.string().uuid().required(),
    ENC_SECRET: Joi.string().required(),
};

export async function getListener({ app, db, envSchema, paths }: AppConfig) {
    const env = parseEnvFile(envSchema, paths);

    const dbInstance = await db({
        user: env.MONGO_USER,
        database: env.MONGO_DB,
        password: env.MONGO_PASSWORD,
        url: env.MONGO_URL,
    });
    const routes = loadRoutes(resources, dbInstance, 'api').map((route) => route.middleware());

    return configureServer({
        app,
        env,
        routes,
        config: {
            isApi: true,
        },
    });
}

getListener({
    envSchema,
    app: new Koa(),
    db: initConnection,
    paths: {
        base: import.meta.url,
        env: '../.env',
    },
}).then((listener) => listener());
