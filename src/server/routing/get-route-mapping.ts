import { sequenceT } from 'fp-ts/lib/Apply';
import { getArrayMonoid } from 'fp-ts/lib/Monoid';
import { getApplyMonoid, Option, option, some } from 'fp-ts/lib/Option';
import { Joi } from 'koa-joi-router';
import { concat, pick } from 'ramda';
import getFilledArray from '../utils/array/get-filled-array';
import reduceEntries from '../utils/array/reduce-entries';
import foldConcat from '../utils/functional/fold-concat';
import maybeProp, { maybePropOr } from '../utils/functional/maybe-prop';
import buildJoiSpec from '../utils/joi-utils/build-joi-spec';
import parseRouteSpec from './spec-parsing/parse-route-spec';
import parseSecuritySpec from './spec-parsing/parse-security-spec';

const M = getApplyMonoid(getArrayMonoid());

/**
 * Map routes onto the router through configuration
 * @param handlers The functions to be used as the final middleware for the routes
 * @param acc The combined routes so far
 * @param stack A configuration object for a route loaded from a json file
 */
const getRouteMapping = (acc: Option<any>, handlers: fnMap, stack: Option<any>) =>
    stack
        .map(([head, ...tail]) =>
            getRouteMapping(
                M.concat(acc, mapMethods(head.route, maybeProp('verbs', head), handlers)),
                handlers,
                getFilledArray(M.concat(some(tail), maybePropOr([], 'paths', head)))
            )
        )
        .getOrElse(acc);

export default getRouteMapping;

/**
 * Maps an object containing swagger and joi docs into a JOI route object
 * @param path A string representing the path of an URI, using :varName for variables
 * @param verbs An object containing http verbs and the swagger/joi docs describing them
 * @param routeHandlers An object containing the handlers to map to the routes
 */
const mapMethods = (path: string, verbs, routeHandlers: fnMap): Option<any> =>
    verbs.map(
        reduceEntries(
            (acc, [method, spec]) =>
                foldConcat(
                    acc,
                    sequenceT(option)(parseSecuritySpec(spec), parseRouteSpec(spec, routeHandlers))
                        .map(args => concat(...args))
                        .map(handler => [
                            {
                                method,
                                path,
                                handler,
                                validate: buildJoiSpec(Joi, spec),
                                meta: pick(['summary', 'description'], spec)
                            }
                        ])
                ),
            []
        )
    );
