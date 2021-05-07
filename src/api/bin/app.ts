#!/usr/bin/env node
import { config } from 'dotenv';
import Koa from 'koa';
import errorHandler from 'koa-better-error-handler';
import { resolve } from 'path';
import { boot } from '../../shared-server/koa/app.js';
import { getDirPath } from '../../shared-server/utils/get-dir-path.js';
import { initConnection } from '../db/index.js';
import { getMiddleware } from '../middleware/get-middleware.js';
import resources from '../resources/index.js';
import { loadRoutes } from '../routing/load-routes.js';

const modulePath = getDirPath(import.meta.url);

const env = config({ path: resolve(modulePath, '../.env') }).parsed;

const dbDetails = Object.freeze({
    user: env.MONGO_USER,
    database: env.MONGO_DB,
    password: env.MONGO_PASSWORD,
    url: env.MONGO_URL,
});

initConnection(dbDetails).then((dbInstance) => {
    const app = new Koa();
    const routeHandlers = loadRoutes(resources, dbInstance, 'api');

    boot({
        app,
        errorHandler,
        isApi: true,
        middleware: getMiddleware(env, app, routeHandlers),
        env,
    });
});
