import { html, renderToString } from '@popeindustries/lit-html-server';
import Layout from '../../components/pages/layout';

export default {
    method: 'get',
    path: '/join',
    handler: async ctx => {
        const page = await renderToString(
            Layout(
                { html },
                {
                    meta: {
                        title: 'Register: My Own World',
                    },
                    content: {
                        title: 'Join us!',
                    },
                }
            )
        );
        ctx.status = 200;
        ctx.body = page;
    },
};
