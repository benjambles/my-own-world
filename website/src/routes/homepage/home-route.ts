import { home } from '../../components/pages/public/home';
import { mockData } from '../../utils/mock-data';
import { LitRoute, RouteMethods } from '../../utils/templates/lit-route';

export const homeRoute: LitRoute = (litHtmlContext, render) => ({
    method: RouteMethods.get,
    path: '/',
    handler: async ctx => {
        const page = await render(home(litHtmlContext, mockData));
        ctx.status = 200;
        ctx.body = page;
    },
});
