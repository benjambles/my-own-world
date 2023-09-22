import publicRoutes from './public/index.js';
import rulesRoutes from './rules/index.js';
import rosterRoutes from './tools/roster/index.js';
import userRoutes from './user/index.js';

export const resources = [userRoutes, publicRoutes, rosterRoutes, rulesRoutes];
