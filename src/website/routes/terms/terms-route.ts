import { Terms } from '../../components/pages/public/terms';
import { mockData } from '../../static/mock-data';
import { clientContext } from '../../utils/client-context';
import { serverContext, serverRenderer } from '../../utils/server-context';

export function TermsRoute(litHtmlContext: clientContext, render);
export function TermsRoute(litHtmlContext: serverContext, render: serverRenderer);
export function TermsRoute(litHtmlContext, render) {
    return {
        method: 'get',
        path: '/terms',
        handler: async ctx => {
            const page = await render(Terms(litHtmlContext, mockData));
            ctx.status = 200;
            ctx.body = page;
        },
    };
}
