import type { DefaultContext, DefaultState, ParameterizedContext } from 'koa';
import { cond, equals, F, T, unary } from 'ramda';
import { isAdmin } from '../compares/is-admin';
import { isUser } from '../compares/is-user';

/**
 * Map of functions to test against roles for granting access to endpoints
 * TODO:: Add types
 */
export const getAccessMap = (additionalChecks = []) => (
    ctx: ParameterizedContext<DefaultState, DefaultContext>,
): Function => {
    return unary(
        cond([
            [equals('role:admin'), () => isAdmin(ctx)],
            [equals('role:user'), () => isUser(ctx)],
            ...additionalChecks,
            [T, F],
        ]),
    );
};
