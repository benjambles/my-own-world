import type { LitRoute } from '@benjambles/mow-ui/dist/utils/templates/lit-route.js';
import { getMockData } from '../../data/get-mock-data.js';
import { accessibilityRoute } from './accessibility-route.js';
import { homeRoute } from './home-route.js';
import { privacyRoute } from './privacy-route.js';
import { termsRoute } from './terms-route.js';

export const publicRoutes: LitRoute[] = [
    homeRoute,
    termsRoute,
    privacyRoute,
    accessibilityRoute,
].map((route) => route(getMockData));
