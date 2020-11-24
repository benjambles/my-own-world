import { home } from '../../../ui/components/pages/public/home/home';
import { mockData } from '../../../ui/utils/mock-data';
import { LitRoute } from '../../../ui/utils/templates/lit-route';

export const homeRoute: LitRoute = (litHtmlContext, render) => ({
    method: 'get' as const,
    path: '/',
    handler: async (ctx) => {
        const page = await render(home(litHtmlContext, mockData));
        ctx.status = 200;
        ctx.body = page;
    },
});
