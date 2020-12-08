import { renderToString } from '@popeindustries/lit-html-server';
import router from 'koa-joi-router';
import { LitRoute } from '../../ui/utils/templates/lit-route';
import { SERVER_CONTEXT } from '../../ui/utils/templates/server-context';
import { accountRoutes } from './account';
import { publicRoutes } from './public';

const baseRoutes: LitRoute[] = [...accountRoutes, ...publicRoutes];

export const getRoutes = (routes = baseRoutes) => {
    return routes.map((routeHandler) => {
        return router().route(routeHandler(SERVER_CONTEXT, renderToString));
    });
};
