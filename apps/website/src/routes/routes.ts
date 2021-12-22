import type { LitRoute } from '@benjambles/mow-ui/dist/utils/templates/lit-route';
import { accountRoutes } from './account/index.js';
import { publicRoutes } from './public/index.js';

export const routes: LitRoute[] = [accountRoutes, publicRoutes].flat();
