import { renderToString } from '@popeindustries/lit-html-server';
import router from 'koa-joi-router';
import { serverRouteConfig, SERVER_CONTEXT } from '../utils/templates/server-context';
import { registerRoute } from './account/register-route';
import { homeRoute } from './home/home-route';
import { termsRoute } from './terms/terms-route';

export const getRoutes = () =>
    [homeRoute, registerRoute, termsRoute].map((routeHandler) => {
        const routeConfig: serverRouteConfig = routeHandler(SERVER_CONTEXT, renderToString);
        return router().route(routeConfig);
    });
