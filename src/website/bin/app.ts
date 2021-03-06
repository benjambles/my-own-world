#!/usr/bin/env node
import 'module-alias/register';
import { config } from 'dotenv';
import Koa from 'koa';
import errorHandler from 'koa-better-error-handler';
import { resolve } from 'path';
import { boot } from '@sharedServer/koa/app';
import { getMiddleware } from '../middleware/get-middleware';
import { routes } from '../routes/routes';

const app = new Koa();
const env = config({ path: resolve(__dirname, '../.env') }).parsed;

boot({
    app,
    errorHandler,
    isApi: false,
    middleware: getMiddleware(env, app, routes),
    env,
});
