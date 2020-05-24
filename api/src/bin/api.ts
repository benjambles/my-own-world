#!/usr/bin/env node
import Koa from 'koa';
import { getEnvParams, listen } from '../../../shared-server/src/koa/app';
import { api } from '../api';
import { MONGO_DB } from '../config';
import { initConnection } from '../db';

const { port, host, nodeEnv } = getEnvParams(process);

initConnection(MONGO_DB).then(() => {
    const app: Koa = api(new Koa(), nodeEnv);
    listen({ port, host, app });
});
