import router from 'koa-joi-router';
import { Option, some } from 'ts-option';
import { getFilledArray, reduceEntries } from '../utils/arrays.js';
import { maybeProp, maybePropOr } from '../utils/functional/maybe-prop.js';
import { buildJoiSpec } from '../utils/joi/build-joi-spec.js';
import {
    getRouteMiddleware,
    RouteHandlers,
} from './spec-parsing/get-route-middleware.js';
import { getSecurityMiddleware } from './spec-parsing/get-security-middleware.js';

/**
 * Map routes onto the router through configuration
 * @param handlers The functions to be used as the final middleware for the routes
 * @param acc The combined routes so far
 * @param stack A configuration object for a route loaded from a json file
 */
export function getRouteMapping(
    acc: Option<any[]>,
    handlers: RouteHandlers,
    stack: Option<any[]>,
    dbInstance,
) {
    return stack
        .map(([head, ...tail]) => {
            return getRouteMapping(
                concatOrElse(
                    acc,
                    mapMethods(
                        head.route,
                        maybeProp('verbs', head),
                        handlers,
                        dbInstance,
                    ),
                ),
                handlers,
                concatOrElse(some(tail), maybePropOr([], 'paths', head)),
                dbInstance,
            );
        })
        .getOrElseValue(acc);
}

/**
 * Maps an object containing swagger and joi docs into a JOI route object
 * @param path A string representing the path of an URI, using :varName for variables
 * @param verbs An object containing http verbs and the swagger/joi docs describing them
 * @param routeHandlers An object containing the handlers to map to the routes
 */
function mapMethods(
    path: string,
    verbs,
    routeHandlers: RouteHandlers,
    dbInstance,
): Option<any> {
    return verbs.flatMap(
        reduceEntries((configs, [method, spec]) => {
            const routeConfig = concatOrElse(
                getSecurityMiddleware(spec),
                getRouteMiddleware(spec, routeHandlers, dbInstance),
            ).map((handler) => {
                const { Joi } = router;
                const { summary, description } = spec;
                return [
                    {
                        method,
                        path,
                        handler,
                        validate: buildJoiSpec(Joi, spec),
                        meta: { summary, description },
                    },
                ];
            });

            return concatOrElse(configs, routeConfig);
        }, some([])),
    );
}

function concatOrElse(acc: Option<any[]>, opt: Option<any[]>): Option<any[]> {
    return getFilledArray(
        opt.match({
            some: (optVals) => acc.map((curr) => curr.concat(optVals)).orElseValue(opt),
            none: () => acc,
        }),
    );
}
