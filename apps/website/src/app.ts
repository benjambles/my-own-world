#!/usr/bin/env node
import { cleanUp, configureServer } from '@benjambles/mow-server/dist/index.js';
import { webErrorHandler } from '@benjambles/mow-server/dist/koa/middleware/errors/web-error-handler.js';
import { getRouter } from '@benjambles/mow-server/dist/routing/create-resource.js';
import { loadEnv, validateEnv } from '@benjambles/mow-server/dist/utils/env.js';
import { resolveImportPath } from '@benjambles/mow-server/dist/utils/paths.js';
import Koa from 'koa';
import { fileURLToPath } from 'url';
import { getMockData } from './data/get-mock-data.js';
import siteLayout from './layouts/core/site.js';
import { paths as userPaths } from './routes/account/config.js';
import errorTemplates from './routes/errors/errors.js';
import { resources } from './routes/routes-config.js';
import { envSchema } from './schema/env-schema.js';
import { renderTemplate } from './utils/render-template.js';

const uiStatic = await import.meta.resolve('@benjambles/mow-ui/fonts');

const paths = {
    base: import.meta.url,
    env: '../.env',
    static: {
        'mow-ui': resolveImportPath(uiStatic, '.'),
        static: resolveImportPath(import.meta.url, './static'),
    },
};

loadEnv(resolveImportPath(paths.base, paths.env));
const env = validateEnv(envSchema, process.env);
const app = new Koa();

export const serve = configureServer({
    app,
    cleanUp,
    config: {
        env,
        helmetConfig: {
            contentSecurityPolicy: {
                directives: {
                    'default-src': ['*'],
                    'script-src-attr': ["'unsafe-inline'"],
                    'script-src': ["'unsafe-inline'"],
                    'script-src-elem': ["'self'", "'unsafe-inline'", 'https://unpkg.com'],
                    'upgrade-insecure-requests': [],
                },
            },
        },
        isApi: false,
        staticPaths: paths.static,
    },
    customErrorHandler: webErrorHandler({
        app,
        errorTemplates,
        layoutComponent: siteLayout,
        layoutDataProvider: getMockData,
        loginPath: userPaths.login,
        renderer: renderTemplate,
    }),
    routes: resources.map((resource) => getRouter(resource(), '', false)),
});

if (fileURLToPath(import.meta.url) === process.argv?.[1]) {
    serve();
}
