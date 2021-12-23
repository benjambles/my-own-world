import { getMockData } from '../../data/get-mock-data.js';
import { accountRoute } from './account/account-route.js';
import { registerRoute } from './register/register-route.js';

export const accountRoutes = [accountRoute, registerRoute].map((route) => route(getMockData));
