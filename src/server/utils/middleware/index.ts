import * as Koa from 'koa';

/**
 * Custom error handling middleware to format JOI errors into JSON errors instead of default text.
 * @param ctx Koa context
 * @param next Next middleware to call if validation passes
 */
export async function catchErrors(ctx: Koa.Context, next: () => Promise<any>): Promise<any> {
    if (ctx.invalid) {
        const message = Object.entries(ctx.invalid).reduce((acc, [k, v]) => {
            acc[k] = !v.details
                ? v.msg
                : v.details.map(({ message, path }) => ({
                      error: message,
                      field: path
                  }));

            return acc;
        }, {});

        ctx.throw(JSON.stringify(message), 400);
    }

    await next();
}

/**
 * Binds access roles for the current route to the Koa context for authorization checks
 * @param roles
 */
export function setAccessRoles(roles: string[]): Koa.Middleware {
    return async function set(ctx: Koa.Context, next: () => Promise<any>): Promise<any> {
        ctx.state.accessRoles = roles;
        await next();
    };
}
