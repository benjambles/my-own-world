import * as Koa from 'koa';
import { bindOptions, bindCheckAccess, baseAccessMap } from '../../utils/routes';
import * as serviceRoutes from './routes';

const config = require('./config.json');

// Default handler for all OPTION method requests
export const sendOptions = bindOptions(config);

/**
 * Throws an error if the users system roles and access rights don't match requirements
 */
export const checkAccess = bindCheckAccess(baseAccessMap);

export const routeHandlers = {
    ...serviceRoutes,
    sendOptions,
    checkAccess
};
