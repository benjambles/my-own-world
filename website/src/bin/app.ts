import program from 'commander';
import Koa from 'koa';
import { pathOr } from 'ramda';
import website from '../index';

program
    .option('-H, --host <host>', 'specify the host [0.0.0.0]', '0.0.0.0')
    .option('-p, --port <port>', 'specify the port [3001]', '3001')
    .option('-b, --backlog <size>', 'specify the backlog size [511]', '511')
    .parse(process.argv);

const env: string = pathOr('development', ['env', 'NODE_ENV'], process);

const app: Koa = website(env);

app.listen(program.port, program.host, ~~program.backlog);
console.log('Listening on %s:%s', program.host, program.port);
