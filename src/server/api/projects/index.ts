import * as Koa from 'koa';

import { isAdmin } from '../../utils/compares';
import { bindOptions, bindCheckAccess } from '../../utils/routes';
import * as projectRoutes from './routes';
import { getObjectMemberFromString } from '../../utils/dataAccessor';

const config = require('./config.json');

/**
 * Throws an error if the projects roles and access rights don't match requirements
 */
const checkAccess = bindCheckAccess(accessMap);

// Default handler for all OPTION method requests
const sendOptions = bindOptions(config);

// Routes on /project and /project/*
export const routeHandlers = {
    ...projectRoutes,
    checkAccess,
    sendOptions
};

/**
 * Map of functions to test against roles for granting access to endpoints
 * @param ctx Koa context object
 */
export function accessMap(ctx: Koa.Context): Function {
    return (role: string): boolean => {
        switch (role) {
            case 'role:admin':
                return isAdmin(ctx.state);
            case 'role:loggedIn':
                return getAuthenticatedUserId(ctx);
            default:
                return false; // role unrelated to these routes, assume no access
        }
    };
}

/**
 *
 * @param ctx
 */
export function getAuthenticatedUserId(ctx: Koa.Context): any {
    return getObjectMemberFromString('state.user.uuid', ctx);
}
