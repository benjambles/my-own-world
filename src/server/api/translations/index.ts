import { bindCheckAccess, bindOptions } from '../../utils/routes';
import * as translationRoutes from './routes';

const config = require('./config.json');

/**
 * Routes on /users and /users/*
 * Special auth routes under: /authentication
 */
export const routeHandlers = {
    sendOptions: bindOptions(config),
    checkAccess: bindCheckAccess()
};
