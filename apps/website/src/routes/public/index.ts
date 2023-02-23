import { RouteParams } from '../../utils/get-route-handler.js';
import { accessibilityRoute } from './accessibility/accessibility-route.js';
import { homeRoute } from './home/route.js';
import { privacyRoute } from './privacy/privacy-route.js';
import { termsRoute } from './terms/terms-route.js';

export const publicRoutes: RouteParams[] = [
    homeRoute,
    termsRoute,
    privacyRoute,
    accessibilityRoute,
];
