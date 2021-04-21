import { layout } from '@ui/components/pages/layout';
import { LitRoute, RouteMethods } from '@ui/utils/templates/lit-route';

export const registerRoute = (getData): LitRoute => (litHtmlContext, render) => ({
    method: RouteMethods.Get,
    path: '/join',
    handler: async (ctx) => {
        const data = getData();
        const page = await render(layout(litHtmlContext, data));
        ctx.status = 200;
        ctx.body = page;
    },
});
