import { html } from 'lit';
import { skiplinks } from '../core/accessibility/skiplinks.js';
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

export function layout(data: Data, children?) {
    return html`${skiplinks()}${header(data.header)} ${children} ${footer(data.footer)} `;
}
