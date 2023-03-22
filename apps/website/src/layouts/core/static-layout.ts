import { footer, header, skiplinks } from '@benjambles/mow-ui/core.js';
import { html, TemplateResult } from 'lit';

interface Data {
    meta: {
        title: string;
    };
    header: Parameters<typeof header>[0];
    footer: Parameters<typeof footer>[0];
    [key: string]: any;
}

const linkList = [
    { text: 'Skip to the content', href: '#content' },
    { text: 'Skip to the footer', href: '#footer' },
];

export function layout(data: Data, children?: TemplateResult<1> | TemplateResult<1>[]) {
    return html`
        ${skiplinks(linkList)} ${header(data.header)} ${children} ${footer(data.footer)}
    `;
}
