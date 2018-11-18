import * as Koa from 'koa';
import { bindOptions, bindCheckAccess, baseAccessMap } from '../../utils/routes';
import * as serviceRoutes from './routes';

const config = require('./config.json');

export const { getHealth, getVersion, getStatus, getMetrics, getDebugData } = serviceRoutes;

// Default handler for all OPTION method requests
export const sendOptions = bindOptions(config);

/**
 * Throwns an error if the users system roles and access rights don't match requirements
 * @param {Koa.Context} ctx - A Koa context object
 * @param {Function} next - Following Koa Middleware
 */
export const checkAccess = bindCheckAccess(baseAccessMap);
