import { layout } from '@ui/components/pages/layout';
import { mockData } from '@ui/utils/mock-data';
import { LitRoute } from '@ui/utils/templates/lit-route';

export const registerRoute: LitRoute = (litHtmlContext, render) => ({
    method: 'get' as const,
    path: '/join',
    handler: async (ctx) => {
        const page = await render(layout(litHtmlContext, mockData));
        ctx.status = 200;
        ctx.body = page;
    },
});
