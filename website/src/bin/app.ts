import Koa from 'koa';
import { getEnvParams, listen } from '../../../shared-server/src/koa/app';
import { applyMiddleware } from '../apply-middleware';

const { port, host, nodeEnv } = getEnvParams(process);
const app: Koa = applyMiddleware(new Koa(), nodeEnv);

listen({ port, host, app });
