import { cond, equals, F, T, unary } from 'ramda';
import { KoaContext } from '@sharedServer/koa/app';
import { isAdmin } from '../compares/is-admin';
import { isUser } from '../compares/is-user';

/**
 * Map of functions to test against roles for granting access to endpoints
 * TODO:: Add types
 */
export const getAccessMap = (additionalChecks = []) => (ctx: KoaContext): Function => {
    return unary(
        cond([
            [equals('role:admin'), () => isAdmin(ctx)],
            [equals('role:user'), () => isUser(ctx)],
            ...additionalChecks,
            [T, F],
        ]),
    );
};
