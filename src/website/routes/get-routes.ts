import { renderToString } from '@popeindustries/lit-html-server';
import router from 'koa-joi-router';
import { ServerRouteConfig, SERVER_CONTEXT } from '../../ui/utils/templates/server-context';
import { registerRoute } from './account/register-route';
import { homeRoute } from './home/home-route';
import { termsRoute } from './terms/terms-route';

export const getRoutes = () => {
    return [homeRoute, registerRoute, termsRoute].map((routeHandler) => {
        const routeConfig: ServerRouteConfig = routeHandler(SERVER_CONTEXT, renderToString);
        return router().route(routeConfig);
    });
};
