import type { DefaultContext, DefaultState, ParameterizedContext } from 'koa';

type ErrorHandler = (
    ctx: ParameterizedContext<DefaultState, DefaultContext>
) => (msg?: string) => void;

/**
 *
 * @param ctx
 */
export const throwNoAccessError: ErrorHandler = (ctx) => {
    return () => {
        ctx.throw(401, 'Unauthorised access to endpoint');
    };
};

/**
 *
 * @param ctx
 */
export const badResponseError: ErrorHandler = (ctx) => {
    return (msg: string) => {
        ctx.throw(400, msg);
    };
};
