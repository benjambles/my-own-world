#!/usr/bin/env node
import { boot, parseEnvFile } from '@benjambles/mow-server/dist/koa/app.js';
import { resolveImportPath } from '@benjambles/mow-server/dist/utils/paths.js';
import Koa from 'koa';
import errorHandler from 'koa-better-error-handler';
import koaJoiRouter from 'koa-joi-router';
import { getMiddleware } from './middleware/get-middleware.js';
import { routes } from './routes/routes.js';

interface AppConfig {
    app: Koa;
    paths: {
        base: string;
        env: string;
        static: string;
    };
}

export async function configureApp({ app, paths }: AppConfig) {
    const env = parseEnvFile(validateEnvParams, paths);

    return boot({
        app,
        errorHandler,
        isApi: false,
        middleware: getMiddleware({
            env,
            app,
            routes,
            staticPath: resolveImportPath(paths.base, paths.static),
        }),
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
        JWT_SECRET: Joi.string().uuid().required(),
    }).validate(envParams);
}

configureApp({
    app: new Koa(),
    paths: {
        base: import.meta.url,
        env: '../../.env',
        static: '../../../../packages/ui/dist/static',
    },
}).then((listener) => listener());
