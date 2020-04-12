import { renderToString } from '@popeindustries/lit-html-server';
import * as router from 'koa-joi-router';
import { SERVER_CONTEXT } from '../utils/server-context';
import { RegisterRoute } from './account/register-route';
import { HomeRoute } from './homepage/home-route';
import { TermsRoute } from './terms/terms-route';

export default [HomeRoute, RegisterRoute, TermsRoute].map(routeHandler => {
    const routeConfig = routeHandler(SERVER_CONTEXT, renderToString);
    router().route(routeConfig);
});
