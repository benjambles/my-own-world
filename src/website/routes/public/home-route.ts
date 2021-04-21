import { home } from '@ui/components/pages/public/home/home';
import { LitRoute, RouteMethods } from '@ui/utils/templates/lit-route';

export const homeRoute = (getData): LitRoute => (litHtmlContext, render) => ({
    method: RouteMethods.Get,
    path: '/',
    handler: async (ctx) => {
        const data = getData();
        const page = await render(home(litHtmlContext, data));
        ctx.status = 200;
        ctx.body = page;
    },
});
