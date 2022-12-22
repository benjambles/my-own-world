import { RouteParams } from '../../utils/get-route-handler.js';
import { accountRoute } from './account/account-route.js';
import { registerRoute } from './register/register-route.js';

export const accountRoutes: RouteParams[] = [accountRoute, registerRoute];
