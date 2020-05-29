import { terms } from '../../../ui/components/pages/public/terms';
import { mockData } from '../../../ui/utils/mock-data';
import { LitRoute, RouteMethods } from '../../../ui/utils/templates/lit-route';

export const termsRoute: LitRoute = (litHtmlContext, render) => ({
    method: RouteMethods.get,
    path: '/terms',
    handler: async (ctx) => {
        const page = await render(terms(litHtmlContext, mockData));
        ctx.status = 200;
        ctx.body = page;
    },
});
