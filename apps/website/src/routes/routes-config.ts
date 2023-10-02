import publicRoutes from './public/index.js';
import resourceRoutes from './resources/index.js';
import rosterRoutes from './resources/roster/index.js';
import rulesRoutes from './rules/index.js';
import userRoutes from './user/index.js';

export const resources = [
    userRoutes,
    publicRoutes,
    resourceRoutes,
    rosterRoutes,
    rulesRoutes,
];
