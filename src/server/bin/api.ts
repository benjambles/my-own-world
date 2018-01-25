#!/usr/bin/env node
import * as program from "commander";
import * as Koa from "koa";

import api from "../index.js";

program
    .option("-H, --host <host>", "specify the host [0.0.0.0]", "0.0.0.0")
    .option("-p, --port <port>", "specify the port [3000]", "3000")
    .option("-b, --backlog <size>", "specify the backlog size [511]", "511")
    .parse(process.argv);

const app: Koa = api();

app.listen(program.port, program.host, ~~program.backlog);
console.log("Listening on %s:%s", program.host, program.port);
