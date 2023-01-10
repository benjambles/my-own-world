#!/usr/bin/env node
import { configureServer } from '@benjambles/mow-server/dist/index.js';
import { loadRoutes } from '@benjambles/mow-server/dist/routing/load-routes.js';
import { initConnection } from '@benjambles/mow-server/dist/utils/db.js';
import { parseEnvFile } from '@benjambles/mow-server/dist/utils/env.js';
import { resolveImportPath } from '@benjambles/mow-server/dist/utils/fs/paths.js';
import Koa from 'koa';
import { fileURLToPath } from 'url';
import { bindModels } from './data/bind-models.js';
import resources from './resources/index.js';
import { Env, envSchema } from './schema/env-schema.js';

const paths = {
    base: import.meta.url,
    env: '../.env',
};

const env: Env = parseEnvFile(envSchema, resolveImportPath(paths.base, paths.env));

const dbInstance = await initConnection({
    user: env.MONGO_USER,
    database: env.MONGO_DB,
    password: env.MONGO_PASSWORD,
    url: env.MONGO_URL,
});

export type DataModel = typeof dataModel;
export const dataModel = bindModels(dbInstance, env);

export const serve = configureServer({
    app: new Koa(),
    env,
    routes: loadRoutes(resources, dataModel, 'api').map((route) => route.middleware()),
    config: {
        isApi: true,
    },
});

if (fileURLToPath(import.meta.url) === process.argv?.[1]) {
    serve();
}
