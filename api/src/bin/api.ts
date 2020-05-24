#!/usr/bin/env node
import * as program from 'commander';
import * as Koa from 'koa';
import { pathOr } from 'ramda';
import api from '../index';
import { initConnection } from '../db';
import { MONGO_DB } from '../config';

program
    .option('-H, --host <host>', 'specify the host [0.0.0.0]', '0.0.0.0')
    .option('-p, --port <port>', 'specify the port [3000]', '3000')
    .option('-b, --backlog <size>', 'specify the backlog size [511]', '511')
    .parse(process.argv);

const env: string = pathOr('development', ['env', 'NODE_ENV'], process);

initConnection(MONGO_DB).then(db => {
    const app: Koa = api(env);

    app.listen(program.port, program.host, ~~program.backlog);
    console.log('Listening on %s:%s', program.host, program.port);
});