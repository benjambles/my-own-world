import * as Koa from 'koa';

/**
 * Custom error handling middleware to format JOI errors into JSON errors instead of default text.
 * @param ctx Koa context
 * @param next Next middleware to call if validation passes
 */
export async function catchErrors(ctx: Koa.Context, next): Promise<any> {
    if (ctx.invalid) {
        let message = {};

        Object.entries(ctx.invalid).forEach(([k, v]) => {
            if (!v.details) {
                message[k] = v.msg;
                return;
            }

            message[k] = v.details.map(err => ({
                error: err.message,
                field: err.path
            }));
        });

        ctx.throw(JSON.stringify(message), 400);
    }

    await next();
}

export function setAccessRoles(roles) {
    const accessRoles = roles;

    return async function set(ctx: Koa.Context, next) {
        ctx.state.accessRoles = accessRoles;
        await next();
    };
}
