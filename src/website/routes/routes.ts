import { LitRoute } from '../../ui/utils/templates/lit-route';
import { accountRoutes } from './account';
import { publicRoutes } from './public';

export const routes: LitRoute[] = [...accountRoutes, ...publicRoutes];
