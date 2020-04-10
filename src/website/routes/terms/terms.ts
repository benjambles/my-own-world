import { html, renderToString } from '@popeindustries/lit-html-server';
import { Terms } from '../../components/pages/public/terms';
import { mockData } from '../../static/mock-data';

export default {
    method: 'get',
    path: '/terms',
    handler: async ctx => {
        const page = await renderToString(Terms({ html }, mockData));
        ctx.status = 200;
        ctx.body = page;
    },
};
