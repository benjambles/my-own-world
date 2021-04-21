import { terms } from '@ui/components/pages/public/terms';
import { LitRoute, RouteMethods } from '@ui/utils/templates/lit-route';

export const termsRoute = (getData): LitRoute => (litHtmlContext, render) => ({
    method: RouteMethods.Get,
    path: '/terms',
    handler: async (ctx) => {
        const data = getData();
        const page = await render(terms(litHtmlContext, data));
        ctx.status = 200;
        ctx.body = page;
    },
});
