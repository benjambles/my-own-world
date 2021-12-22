import type { LitRoute } from '@benjambles/mow-ui/dist/utils/templates/lit-route.js';
import { getMockData } from '../../data/get-mock-data.js';
import { accountRoute } from './account-route.js';
import { registerRoute } from './register-route.js';

export const accountRoutes: LitRoute[] = [accountRoute, registerRoute].map((route) =>
    route(getMockData),
);
