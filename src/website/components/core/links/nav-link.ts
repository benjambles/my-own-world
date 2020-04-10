import {
    clientContext,
    clientResult,
    serverContext,
    serverResult,
} from '../../../typings/templates';
export interface Link {
    href: string;
    text: string;
    rel?: string;
    target?: string;
    classes?: string[];
    action?: string;
    active?: boolean;
}

export function NavLink(context: clientContext, data: Link): clientResult;
export function NavLink(context: serverContext, data: Link): serverResult;
export function NavLink(context, { text, href, active }: Link) {
    const { html } = context;

    return html`<a href="${href}" class="${active ? 'active' : ''}">${text}</a>`;
}
