import fs = require('fs');
import responseTime = require('koa-response-time');
import compress = require('koa-compress');
import morgan = require('koa-morgan');
import Router = require('koa-router');
import Koa = require('koa');
import load = require('./lib/load');
import setEtag = require('./lib/koa-etag');
import bodyParser = require('koa-bodyparser');

const router: Router = new Router();

const env: string = process.env.NODE_ENV || 'development';

const accessLogStream: fs.WriteStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });

/**
 * Expose `api()`.
 */

export = api;

/**
 * Initialize an app
 * 
 * @return {Koa}
 * @api public
 */

load(router, __dirname + '/routes');

function api(): Koa {
  const app: Koa = new Koa();

  // logging
  if ('test' != env) app.use(morgan('combined', { stream: accessLogStream }));

  // x-response-time
  app.use(responseTime());

  app.use(setEtag());

  // compression
  app.use(compress());

  // boot - load routes

  app.use(async (ctx, next) => {
    if (~['put', 'post'].indexOf(ctx.method.toLowerCase())) ctx.disableBodyParser = true;
    await next();
  });

  app.use(bodyParser());

  // routing
  app
    .use(router.routes())
    .use(router.allowedMethods());

  app.on('error', (err, ctx) =>
    console.log('server error', err, ctx)
  );

  return app;
}