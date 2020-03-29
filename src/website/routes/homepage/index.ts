import { renderToString, html } from '@popeindustries/lit-html-server';
import Layout from '../../components/pages/layout';

export default {
    method: 'get',
    path: '/',
    handler: async ctx => {
        const page = await renderToString(
            Layout(
                { html },
                {
                    meta: {
                        title: 'Home: My Own World',
                    },
                    content: {
                        title: 'My Own World',
                    },
                }
            )
        );
        ctx.status = 200;
        ctx.body = page;
    },
};
