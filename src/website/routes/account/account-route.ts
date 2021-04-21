import { layout } from '@ui/components/pages/layout';
import { LitRoute, RouteMethods } from '@ui/utils/templates/lit-route';

export const accountRoute = (getData): LitRoute => (litHtmlContext, render) => {
    return {
        method: RouteMethods.Get,
        path: '/account',
        handler: async (ctx) => {
            const data = getData();
            const page = await render(layout(litHtmlContext, data));
            ctx.status = 200;
            ctx.body = page;
        },
    };
};
