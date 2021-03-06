import { Joi } from 'koa-joi-router';
import { Option, some } from 'ts-option';
import { getFilledArray } from '../utils/array/get-filled-array';
import { reduceEntries } from '../utils/array/reduce-entries';
import { maybeProp, maybePropOr } from '../utils/functional/maybe-prop';
import { buildJoiSpec } from '../utils/joi-utils/build-joi-spec';
import { send } from '../utils/routes/send';
import { getRouteMiddleware, RouteHandlers } from './spec-parsing/get-route-middleware';
import { getSecurityMiddleware } from './spec-parsing/get-security-middleware';

/**
 * Map routes onto the router through configuration
 * @param handlers The functions to be used as the final middleware for the routes
 * @param acc The combined routes so far
 * @param stack A configuration object for a route loaded from a json file
 */
export const getRouteMapping = (
    acc: Option<any[]>,
    handlers: RouteHandlers,
    stack: Option<any[]>,
) => {
    return stack
        .map(([head, ...tail]) => {
            return getRouteMapping(
                concatOrElse(acc, mapMethods(head.route, maybeProp('verbs', head), handlers)),
                handlers,
                concatOrElse(some(tail), maybePropOr([], 'paths', head)),
            );
        })
        .getOrElseValue(acc);
};

/**
 * Maps an object containing swagger and joi docs into a JOI route object
 * @param path A string representing the path of an URI, using :varName for variables
 * @param verbs An object containing http verbs and the swagger/joi docs describing them
 * @param routeHandlers An object containing the handlers to map to the routes
 */
const mapMethods = (path: string, verbs, routeHandlers: RouteHandlers): Option<any> => {
    return verbs.flatMap(
        reduceEntries((configs, [method, spec]) => {
            const routeConfig = concatOrElse(
                getRouteMiddleware(spec, routeHandlers, send),
                getSecurityMiddleware(spec),
            ).map((handler) => {
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
};

const concatOrElse = (acc: Option<any[]>, opt: Option<any[]>): Option<any[]> => {
    return getFilledArray(
        opt.match({
            some: (optVals) => acc.map((curr) => curr.concat(optVals)).orElseValue(opt),
            none: () => acc,
        }),
    );
};
