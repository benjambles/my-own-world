import * as Koa from 'koa';

export const throwNoAccessError = (ctx: Koa.ParameterizedContext<any, {}>) => () => {
    ctx.throw(401, 'Unauthorised access to endpoint');
};

export const badResponseError = (ctx: Koa.ParameterizedContext<any, {}>) => msg => {
    ctx.throw(400, msg);
};
