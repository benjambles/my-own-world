import { LitRoute } from '../../../ui/utils/templates/lit-route';
import { getMockData } from '../../data/get-mock-data';
import { accessibilityRoute } from './accessibility-route';
import { homeRoute } from './home-route';
import { privacyRoute } from './privacy-route';
import { termsRoute } from './terms-route';

export const publicRoutes: LitRoute[] = [
    homeRoute,
    termsRoute,
    privacyRoute,
    accessibilityRoute,
].map((route) => route(getMockData));
