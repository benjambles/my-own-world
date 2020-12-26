#!/usr/bin/env node
import { config } from 'dotenv';
import Koa from 'koa';
import errorHandler from 'koa-better-error-handler';
import { resolve } from 'path';
import { boot } from '../../shared-server/koa/app';
import { initConnection } from '../db';
import { getMiddleware } from './get-middleware';

const env = config({ path: resolve(__dirname, '../.env') }).parsed;

const db = Object.freeze({
    user: env.MONGO_USER,
    database: env.MONGO_DB,
    password: env.MONGO_PASSWORD,
    url: env.MONGO_URL,
});

initConnection(db).then(() => {
    const app = new Koa();

    boot({
        app,
        errorHandler,
        isApi: false,
        middleware: getMiddleware(env, app),
        env,
    });
});
