import { clientContext, clientResult } from '../../utils/templates/client-context';
import { LazyStylesheet } from '../utils/lazy-stylesheet';
import { serverContext, serverResult } from '../../utils/templates/server-context';
import { Footer, FooterData } from '../core/footer/footer';
import { Header, HeaderData } from '../core/header/header';

interface Data {
    meta: {
        title: string;
    };
    [key: string]: any;
    header: HeaderData;
    footer: FooterData;
}

export function Layout(context: clientContext, data: Data, children?): clientResult;
export function Layout(context: serverContext, data: Data, children?): serverResult;
export function Layout(context, data, children?) {
    const { html } = context;

    return html`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>${data.meta.title}</title>
                ${LazyStylesheet(context, '/styles/base.css')}
            </head>
            <body>
                ${Header(context, data.header)} ${children ? children : undefined}
                ${Footer(context, data.footer)}
            </body>
        </html>
    `;
}
