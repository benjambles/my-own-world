import * as Koa from 'koa';
import maybeProp from '../utils/functional/maybe-prop';
import setAccessRoles from '../utils/middleware/set-access-roles';

/**
 * Takes an object representing a routes security configuration and returns an array containing
 * the Koa middleware for running security checks on the route
 * @param securityMap
 */
const getSecurityHandlers = (securityMap: string[]): Koa.Middleware[] =>
    securityMap.reduce(
        (acc, item) =>
            maybeProp('jwt', item).fold(() => acc, jwt => acc.concat([setAccessRoles(jwt)])),
        []
    );

export default getSecurityHandlers;
