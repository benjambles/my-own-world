import * as Koa from 'koa';
import * as R from 'ramda';
import isAdmin from '../compares/is-admin';
import isUser from '../compares/is-user';

/**
 * Map of functions to test against roles for granting access to endpoints
 * @param ctx Koa context object
 */
export default function getAccessMap(additionalChecks = []) {
    return (ctx: Koa.Context): Function =>
        R.cond([
            [R.equals('role:admin'), () => isAdmin(ctx)],
            [R.equals('role:user'), () => isUser(ctx)],
            ...additionalChecks,
            [R.T, R.F]
        ]);
}
