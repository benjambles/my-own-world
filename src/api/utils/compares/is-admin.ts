import { KoaContext } from '@sharedServer/koa/app';

/**
 *
 * @param token
 */
export const isAdmin = (ctx: KoaContext): boolean => {
    return ctx.state?.user?.userData === true;
};
