import classNames from 'classnames';
import { clientContext, clientResult } from '../../../utils/client-context';
import { serverContext, serverResult } from '../../../utils/server-context';

export interface LinkProps {
    href: string;
    text: string;
    display?: {
        active?: boolean;
        light?: boolean;
        underlined?: boolean;
        bold?: boolean;
        bar?: boolean;
    };
}

export function Link(context: clientContext, data: LinkProps): clientResult;
export function Link(context: serverContext, data: LinkProps): serverResult;
export function Link(context, { text, href, display = {} }: LinkProps) {
    const { html } = context;
    return html`<a href="${href}" class="${classNames(display)}">${text}</a>`;
}
