import * as Koa from 'koa';

export const throwNoAccessError = (ctx: Koa.ParameterizedContext<any, {}>) => () => {
    ctx.throw(401, 'Unauthorised access to endpoint');
};
