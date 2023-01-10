import { Middleware } from 'koa';
import { Collection } from 'mongodb';
import { option, Option } from 'ts-option';
import { catchJoiErrors } from '../../koa/middleware/catch-joi-errors.js';
import { maybeProp } from '../../utils/functional/maybe-prop.js';
export interface RouteHandler {
    (collection: Collection): Middleware;
}

export interface RouteHandlers {
    [name: string]: Middleware;
}

/**
 *
 * @param spec
 * @param routeHandlers
 */
export function getRouteMiddleware(
    spec,
    routeHandlers: Record<string, Middleware>,
): Option<Middleware[]> {
    return maybeProp('operationId', spec)
        .flatMap((prop) => option(routeHandlers[prop]))
        .map((operation) => [catchJoiErrors, routeHandlers.checkAccess, operation]);
}
