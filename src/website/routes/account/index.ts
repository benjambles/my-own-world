import { LitRoute } from '../../../ui/utils/templates/lit-route';
import { getMockData } from '../../data/get-mock-data';
import { accountRoute } from './account-route';
import { registerRoute } from './register-route';

export const accountRoutes: LitRoute[] = [accountRoute, registerRoute].map((route) =>
    route(getMockData),
);
