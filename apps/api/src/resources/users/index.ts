import { isCurrentUser } from '@benjambles/mow-server/dist/utils/access-checks/get-authenticated-user-id.js';
import config from './config.json' assert { type: 'json' };
import * as identifierRoutes from './identifiers/routes.js';
import * as userRoutes from './routes.js';

/**
 * Routes on /users and /users/*
 * Special auth routes under: /authentication
 */
export default {
    config,
    accessMap: { 'role:owner': isCurrentUser },
    routeHandlers: {
        ...userRoutes,
        ...identifierRoutes,
    },
};
