#!/usr/bin/env node
import { config } from 'dotenv';
import Koa from 'koa';
import errorHandler from 'koa-better-error-handler';
import { resolve } from 'path';
import { boot } from '../../shared-server/koa/app.js';
import { getDirPath } from '../../shared-server/utils/get-dir-path.js';
import { getMiddleware } from '../middleware/get-middleware.js';
import { routes } from '../routes/routes.js';

const modulePath = getDirPath(import.meta.url);

const app = new Koa();
const env = config({ path: resolve(modulePath, '../.env') }).parsed;

boot({
    app,
    errorHandler,
    isApi: false,
    middleware: getMiddleware(env, app, routes),
    env,
});
