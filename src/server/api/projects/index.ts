import { getAccessMap, bindCheckAccess, bindOptions } from '../../utils/routes';
import * as projectRoutes from './routes';

const config = require('./config.json');

/**
 * Routes on /project and /project/*
 */
export const routeHandlers = {
    ...projectRoutes,
    checkAccess: bindCheckAccess(getAccessMap()),
    sendOptions: bindOptions(config)
};
