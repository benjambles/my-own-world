import { renderToString, html } from '@popeindustries/lit-html-server';
import { Home } from '../../components/pages/public/home';
import { Context } from 'koa';
import { mockData } from '../../static/mock-data';

export default {
    method: 'get',
    path: '/',
    handler: async (ctx: Context) => {
        const page = await renderToString(Home({ html }, mockData));
        ctx.status = 200;
        ctx.body = page;
    },
};
