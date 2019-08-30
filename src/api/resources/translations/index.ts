import { getAccessChecker } from '../../utils/middleware/get-access-checker';
import { bindOptions } from '../../utils/routes/bind-options';

const config = require('./config.json');

/**
 * Routes on /users and /users/*
 * Special auth routes under: /authentication
 */
export const routeHandlers = {
    sendOptions: bindOptions(config),
    checkAccess: getAccessChecker()
};
