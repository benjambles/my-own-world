import { Layout } from '../../components/pages/layout';
import { mockData } from '../../static/mock-data';
import { clientContext } from '../../utils/client-context';
import { serverContext, serverRenderer } from '../../utils/server-context';

export function RegisterRoute(litHtmlContext: clientContext, render);
export function RegisterRoute(litHtmlContext: serverContext, render: serverRenderer);
export function RegisterRoute(litHtmlContext, render) {
    return {
        method: 'get',
        path: '/join',
        handler: async ctx => {
            const page = await render(Layout(litHtmlContext, mockData));
            ctx.status = 200;
            ctx.body = page;
        },
    };
}
