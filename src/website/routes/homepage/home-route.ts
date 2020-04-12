import { Context } from 'koa';
import { Home } from '../../components/pages/public/home';
import { mockData } from '../../static/mock-data';
import { clientContext } from '../../utils/client-context';
import { serverContext, serverRenderer } from '../../utils/server-context';

export function HomeRoute(litHtmlContext: clientContext, render);
export function HomeRoute(litHtmlContext: serverContext, render: serverRenderer);
export function HomeRoute(litHtmlContext, render) {
    return {
        method: 'get',
        path: '/',
        handler: async (ctx: Context) => {
            const page = await render(Home(litHtmlContext, mockData));
            ctx.status = 200;
            ctx.body = page;
        },
    };
}
