import type { LitRoute } from '../../ui/utils/templates/lit-route';
import { accountRoutes } from './account/index.js';
import { publicRoutes } from './public/index.js';

export const routes: LitRoute[] = [accountRoutes, publicRoutes].flat();
