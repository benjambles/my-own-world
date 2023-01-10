import { isCurrentUser } from '@benjambles/mow-server/dist/utils/access-checks/get-authenticated-user-id.js';
import { DataModel } from '../../app.js';
import config from './config.json' assert { type: 'json' };
import identifierRoutes from './identifiers/routes.js';
import userRoutes from './routes.js';

/**
 * Routes on /users and /users/*
 * Special auth routes under: /authentication
 */
export default function users(dataModel: DataModel) {
    return {
        config,
        accessMap: { 'role:owner': isCurrentUser },
        routeHandlers: {
            ...userRoutes(dataModel),
            ...identifierRoutes(dataModel),
        },
    };
}
