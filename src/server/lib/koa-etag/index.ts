import crypto = require('crypto');
import * as Koa from "koa";

/**
 * Expose `setEtag()`.
 */

export = setEtag;

/**
 * Add etag header
 *
 * @return {Koa.Middleware}
 * @api public
 */
function setEtag(): Koa.Middleware {
  return async function etag(ctx, next) {
    await next();
    if (ctx.body) {
      ctx.set('etag', crypto.createHash('sha256').update(JSON.stringify(ctx.body)).digest('hex'));
    }
  }
}
