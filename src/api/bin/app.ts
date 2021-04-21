#!/usr/bin/env node
import 'module-alias/register';
import { config } from 'dotenv';
import Koa from 'koa';
import errorHandler from 'koa-better-error-handler';
import { resolve } from 'path';
import { boot } from '@sharedServer/koa/app';
import { initConnection } from '../db';
import { getMiddleware } from '../middleware/get-middleware';
import { loadRoutes } from '../routing/load-routes';

const env = config({ path: resolve(__dirname, '../.env') }).parsed;

const db = Object.freeze({
    user: env.MONGO_USER,
    database: env.MONGO_DB,
    password: env.MONGO_PASSWORD,
    url: env.MONGO_URL,
});

initConnection(db).then(() => {
    const app = new Koa();
    const routeHandlers = loadRoutes(resolve(__dirname, '../resources'), 'api');

    boot({
        app,
        errorHandler,
        isApi: true,
        middleware: getMiddleware(env, app, routeHandlers),
        env,
    });
});
