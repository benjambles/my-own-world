#!/usr/bin/env node
import Koa from 'koa';
import errorHandler from 'koa-better-error-handler';
import { boot, listen } from '../../shared-server/koa/app';
import { MONGO_DB } from '../config';
import { initConnection } from '../db';
import { getMiddleware } from './get-middleware';

initConnection(MONGO_DB).then(() => {
    boot({
        koa: new Koa(),
        errorHandler,
        isApi: false,
        getMiddleware,
        listener: listen,
    })(process);
});
