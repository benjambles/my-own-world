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

const linkList = [
    { text: 'Skip to the content', href: '#content' },
    { text: 'Skip to the footer', href: '#footer' },
];

export function layout(data: Data, children?) {
    return html`
        ${skiplinks(linkList)}${header(data.header)} ${children} ${footer(data.footer)}
    `;
}
