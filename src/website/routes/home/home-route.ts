import { home } from '../../../ui/components/pages/public/home/home';
import { mockData } from '../../../ui/utils/mock-data';
import { LitRoute, RouteMethods } from '../../../ui/utils/templates/lit-route';

export const homeRoute: LitRoute = (litHtmlContext, render) => ({
    method: RouteMethods.get,
    path: '/',
    handler: async (ctx) => {
        const page = await render(home(litHtmlContext, mockData));
        ctx.status = 200;
        ctx.body = page;
    },
});
