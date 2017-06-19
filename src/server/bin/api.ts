#!/usr/bin/env node

/**
 * Module dependencies.
 */

import program = require('commander');
import api = require('../index.js');
import * as Koa from 'koa';

// options

program
  .option('-H, --host <host>', 'specify the host [0.0.0.0]', '0.0.0.0')
  .option('-p, --port <port>', 'specify the port [3000]', '3000')
  .option('-b, --backlog <size>', 'specify the backlog size [511]', '511')
  .parse(process.argv);

// create app

var app: Koa = api();

// listen

app.listen(program.port, program.host, ~~program.backlog);
console.log('Listening on %s:%s', program.host, program.port);