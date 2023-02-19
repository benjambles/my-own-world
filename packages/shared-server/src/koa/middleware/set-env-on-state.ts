import Koa from 'koa';

export function setEnvOnState(env: NodeJS.ProcessEnv): Koa.Middleware {
    return async (ctx, next) => {
        ctx.state.env = env;
        await next();
    };
}
