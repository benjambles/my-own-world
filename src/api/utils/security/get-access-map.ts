import * as Koa from 'koa';
import { cond, equals, T, F } from 'ramda';
import isAdmin from '../compares/is-admin';
import isUser from '../compares/is-user';

/**
 * Map of functions to test against roles for granting access to endpoints
 * TODO:: Add types
 */
export default function getAccessMap(additionalChecks = []) {
    return (ctx: Koa.Context): Function =>
        cond([
            [equals('role:admin'), () => isAdmin(ctx)],
            [equals('role:user'), () => isUser(ctx)],
            ...additionalChecks,
            [T, F],
        ]);
}
