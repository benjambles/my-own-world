import type { LitTpl } from '../../utils/templates/lit-tpl';
import { footer, FooterData } from '../core/footer/footer';
import { header, HeaderData } from '../core/header/header';
import { lazyStylesheet } from '../utils/lazy-stylesheet';

type Data = {
    meta: {
        title: string;
    };
    [key: string]: any;
    header: HeaderData;
    footer: FooterData;
};

export const layout: LitTpl<any> = (context, data, children?) => {
    const { html } = context;

    return html`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>${data.meta.title}</title>
                ${lazyStylesheet(context, '/styles/global-css/base.css')}
                ${lazyStylesheet(context, '/styles/core/buttons/buttons.css')}
                ${lazyStylesheet(context, '/styles/core/links/links.css')}
            </head>
            <body>
                ${header(context, data.header)} ${children ? children : undefined}
                ${footer(context, data.footer)}
            </body>
        </html>
    `;
};
