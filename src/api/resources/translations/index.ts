import { getAccessChecker } from '../../utils/middleware/get-access-checker.js';
import { bindOptions } from '../../utils/routes/bind-options.js';
import translationsConfig from './config.json';

export const config = translationsConfig;

/**
 * Routes on /users and /users/*
 * Special auth routes under: /authentication
 */
export const routeHandlers = {
    sendOptions: bindOptions(config),
    checkAccess: getAccessChecker(),
};
