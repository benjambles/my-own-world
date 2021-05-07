import { home } from '../../../ui/components/pages/public/home/home.js';
import { LitRoute, RouteMethods } from '../../../ui/utils/templates/lit-route.js';

export function homeRoute(getData): LitRoute {
    return (litHtmlContext, render) => ({
        method: RouteMethods.Get,
        path: '/',
        handler: async (ctx) => {
            const data = getData();
            const page = await render(home(litHtmlContext, data));
            ctx.status = 200;
            ctx.body = page;
        },
    });
}
