#!/usr/bin/env node
import { boot, parseEnvFile } from '@benjambles/mow-server/dist/koa/app.js';
import Koa from 'koa';
import errorHandler from 'koa-better-error-handler';
import koaJoiRouter from 'koa-joi-router';
import { initConnection } from './db/index.js';
import { getMiddleware } from './middleware/get-middleware.js';
import resources from './resources/index.js';
import { loadRoutes } from './routing/load-routes.js';

interface AppConfig {
    app: Koa;
    paths: {
        base: string;
        env: string;
    };
    db: (params: { user: string; database: string; password: string; url: string }) => Promise<any>;
}

export async function configureApp({ app, paths, db }: AppConfig) {
    const env = parseEnvFile(validateEnvParams, paths);

    const dbInstance = await db({
        user: env.MONGO_USER,
        database: env.MONGO_DB,
        password: env.MONGO_PASSWORD,
        url: env.MONGO_URL,
    });
    const routeHandlers = loadRoutes(resources, dbInstance, 'api');

    return boot({
        app,
        errorHandler,
        isApi: true,
        middleware: getMiddleware(env, app, routeHandlers),
        env,
    });
}

/**
 * Ensures the the required parameters for a basic app to boot exist in
 * the node environment
 *
 * @param envParams
 */
export function validateEnvParams(envParams = {}) {
    const { Joi } = koaJoiRouter;

    return Joi.object({
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
        MONGO_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().uuid().required(),
    }).validate(envParams);
}

configureApp({
    app: new Koa(),
    paths: {
        base: import.meta.url,
        env: '../../.env',
    },
    db: initConnection,
}).then((listener) => listener());
