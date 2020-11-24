import { renderToString } from '@popeindustries/lit-html-server';
import router from 'koa-joi-router';
import { LitRoute } from '../../ui/utils/templates/lit-route';
import { SERVER_CONTEXT } from '../../ui/utils/templates/server-context';
import { registerRoute } from './account/register-route';
import { homeRoute } from './home/home-route';
import { termsRoute } from './terms/terms-route';

const routes: LitRoute[] = [registerRoute, homeRoute, termsRoute];

export const getRoutes = () => {
    return routes.map((routeHandler) => {
        return router().route(routeHandler(SERVER_CONTEXT, renderToString));
    });
};
