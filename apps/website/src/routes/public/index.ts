import { getMockData } from '../../data/get-mock-data.js';
import { accessibilityRoute } from './accessibility/accessibility-route.js';
import { homeRoute } from './home/home-route.js';
import { privacyRoute } from './privacy/privacy-route.js';
import { termsRoute } from './terms/terms-route.js';

export const publicRoutes = [homeRoute, termsRoute, privacyRoute, accessibilityRoute].map((route) =>
    route(getMockData),
);
