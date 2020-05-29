#!/usr/bin/env node
import Koa from 'koa';
import { boot, listen } from '../../shared-server/koa/app';
import { applyMiddleware } from '../apply-middleware';
import { MONGO_DB } from '../config';
import { initConnection } from '../db';

initConnection(MONGO_DB).then(() => {
    boot(applyMiddleware(new Koa()), listen)(process);
});
