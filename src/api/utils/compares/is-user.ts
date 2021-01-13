import { KoaContext } from '@sharedServer/koa/app';

/**
 *
 * @param token
 */
export const isUser = (ctx: KoaContext): boolean => !!ctx.state?.user;
