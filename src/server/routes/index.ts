import * as response from "../lib/response";
import * as Koa from 'koa';

/**
 * Returns a middleware for generating OPTIONS and returning the swagger conf for the given route to the browser
 * @param config Configs for the given route
 */
export function bindOptions(config): Function {
    /**
     * Return the options and config for the route
     * @route [OPTIONS] /users
     * @param ctx A Koa context object
     */
    return async function sendOptions(ctx: Koa.Context): Promise<void> {
        try {
            return response.sendOptions(ctx, Object.assign({}, config.paths[ctx.request.path.replace('/api', '')]));
        } catch (e) {
            ctx.throw('There was an error whilst generating options', 400);
        }
    }
}
