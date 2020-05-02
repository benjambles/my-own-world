import { clientContext, clientResult } from '../../utils/templates/client-context';
import { lazyStylesheet } from '../utils/lazy-stylesheet';
import { serverContext, serverResult } from '../../utils/templates/server-context';
import { footer, FooterData } from '../core/footer/footer';
import { header, HeaderData } from '../core/header/header';

interface Data {
    meta: {
        title: string;
    };
    [key: string]: any;
    header: HeaderData;
    footer: FooterData;
}

export function layout(context: clientContext, data: Data, children?): clientResult;
export function layout(context: serverContext, data: Data, children?): serverResult;
export function layout(context, data, children?) {
    const { html } = context;

    return html`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>${data.meta.title}</title>
                ${lazyStylesheet(context, '/styles/base.css')}
            </head>
            <body>
                ${header(context, data.header)} ${children ? children : undefined}
                ${footer(context, data.footer)}
            </body>
        </html>
    `;
}
