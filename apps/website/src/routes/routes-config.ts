import accountRoutes from './account/index.js';
import publicRoutes from './public/index.js';
import rosterRoutes from './tools/roster/index.js';
import rulesRoutes from './rules/index.js';

export const resources = [accountRoutes, publicRoutes, rosterRoutes, rulesRoutes];
