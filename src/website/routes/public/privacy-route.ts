import { terms } from '../../../ui/components/pages/public/terms';
import { mockData } from '../../../ui/utils/mock-data';
import { LitRoute } from '../../../ui/utils/templates/lit-route';

export const privacyRoute: LitRoute = (litHtmlContext, render) => ({
    method: 'get' as const,
    path: '/privacy-policy',
    handler: async (ctx) => {
        const page = await render(terms(litHtmlContext, mockData));
        ctx.status = 200;
        ctx.body = page;
    },
});
