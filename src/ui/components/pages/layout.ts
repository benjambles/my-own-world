import type { LitTpl } from '../../utils/templates/lit-tpl.js';
import { footer, FooterData } from '../core/footer/footer.js';
import { header, HeaderData } from '../core/header/header.js';

interface Data {
    meta: {
        title: string;
    };
    header: HeaderData;
    footer: FooterData;
    [key: string]: any;
}

export function layout(context, data: Data, children?): LitTpl<any> {
    const { html } = context;

    return html`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>${data.meta.title}</title>
                <link href="/styles/global-css/base.css" rel="stylesheet" />
            </head>
            <body>
                ${header(context, data.header)} ${children} ${footer(context, data.footer)}
            </body>
        </html>
    `;
}
