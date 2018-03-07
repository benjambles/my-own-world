import * as Koa from 'koa';

import { isAdmin, isTrue, isUser } from '../../utils';
import { bindOptions } from '../../utils/routes';
//import * as projectRoutes from './routes';

const config = require('./config.json');

// Default handler for all OPTION method requests
export const sendOptions = bindOptions(config);

/**
 * Throwns an error if the users system roles and access rights don't match requirements
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 */
export async function checkAccess(ctx: Koa.Context, next: Function): Promise<void> {
    const roles = ctx.state.accessRoles || [];

    if (roles.length) {
        const hasAccess: boolean = roles
            .map(role => {
                switch (role) {
                    case 'role:admin':
                        return isAdmin(ctx.state);
                    case 'role:user':
                        return isUser(ctx.state);
                    default:
                        return false; // role unrelated to these routes, assume no access
                }
            })
            .some(isTrue);

        if (!hasAccess) {
            ctx.throw(401, 'Unauthorised access to endpoint');
        }
    }
}
