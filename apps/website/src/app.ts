#!/usr/bin/env node
import { configureServer } from '@benjambles/mow-server/dist/index.js';
import { webErrorHandler } from '@benjambles/mow-server/dist/koa/middleware/errors/web-error-handler.js';
import { getRouter } from '@benjambles/mow-server/dist/routing/create-resource.js';
import { loadEnv, validateEnv } from '@benjambles/mow-server/dist/utils/env.js';
import { resolveImportPath } from '@benjambles/mow-server/dist/utils/paths.js';
import Koa from 'koa';
import { fileURLToPath } from 'url';
import { getMockData } from './data/get-mock-data.js';
import { resources } from './routes/routes-config.js';
import { envSchema } from './schema/env-schema.js';
import { iterateTemplateParts } from './utils/render-template.js';

const uiStatic = await import.meta.resolve('@benjambles/mow-ui/static');

const paths = {
    base: import.meta.url,
    env: '../.env',
    static: {
        static: resolveImportPath(import.meta.url, './static'),
        'mow-ui': resolveImportPath(uiStatic, './static'),
    },
};

loadEnv(resolveImportPath(paths.base, paths.env));
const env = validateEnv(envSchema, process.env);
const app = new Koa();

const errorTemplateDir = './routes/errors';

export const serve = configureServer({
    app,
    config: {
        env,
        helmetConfig: {
            contentSecurityPolicy: {
                directives: {
                    'default-src': ['*'],
                    'script-src-attr': ["'unsafe-inline'"],
                    'upgrade-insecure-requests': [],
                },
            },
        },
        isApi: false,
        staticPaths: paths.static,
    },
    routes: resources.map((resource) => getRouter(resource(), '', false)),
    customErrorHandler: webErrorHandler(
        app,
        {
            401: resolveImportPath(import.meta.url, errorTemplateDir, '404.js'),
            403: resolveImportPath(import.meta.url, errorTemplateDir, '404.js'),
            404: resolveImportPath(import.meta.url, errorTemplateDir, '404.js'),
            500: resolveImportPath(import.meta.url, errorTemplateDir, '404.js'),
        },
        iterateTemplateParts,
        getMockData,
    ),
});

if (fileURLToPath(import.meta.url) === process.argv?.[1]) {
    serve();
}
