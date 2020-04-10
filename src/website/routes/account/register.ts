import { html, renderToString } from '@popeindustries/lit-html-server';
import { Layout } from '../../components/pages/layout';
import { mockData } from '../../static/mock-data';

export default {
    method: 'get',
    path: '/join',
    handler: async ctx => {
        const page = await renderToString(Layout({ html }, mockData));
        ctx.status = 200;
        ctx.body = page;
    },
};
