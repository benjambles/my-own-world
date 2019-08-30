import * as Koa from 'koa';

/**
 *
 * @param ctx
 */
export const throwNoAccessError = (ctx: Koa.ParameterizedContext<any, {}>) => () => {
    ctx.throw(401, 'Unauthorised access to endpoint');
};

/**
 *
 * @param ctx
 */
export const badResponseError = (ctx: Koa.ParameterizedContext<any, {}>) => (msg: string) => {
    ctx.throw(400, msg);
};
