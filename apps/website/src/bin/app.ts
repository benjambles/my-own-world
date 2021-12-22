#!/usr/bin/env node
import { boot } from '@benjambles/mow-server/dist/koa/app.js';
import { getDirPath } from '@benjambles/mow-server/dist/utils/get-dir-path.js';
import { config } from 'dotenv';
import Koa from 'koa';
import errorHandler from 'koa-better-error-handler';
import { resolve } from 'path';
import { getMiddleware } from '../middleware/get-middleware.js';
import { routes } from '../routes/routes.js';

const modulePath = getDirPath(import.meta.url);

const app = new Koa();
const env = config({ path: resolve(modulePath, '../../.env') }).parsed;

boot({
    app,
    errorHandler,
    isApi: false,
    middleware: getMiddleware(env, app, routes),
    env,
});
