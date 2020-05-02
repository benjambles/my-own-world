import classNames from 'classnames';
import { clientContext, clientResult } from '../../../utils/templates/client-context';
import { serverContext, serverResult } from '../../../utils/templates/server-context';

export interface LinkProps {
    href: string;
    text: string;
    display?: {
        active?: boolean;
        underlined?: boolean;
        bold?: boolean;
    };
}

export function link(context: clientContext, data: LinkProps): clientResult;
export function link(context: serverContext, data: LinkProps): serverResult;
export function link(context, { text, href, display = {} }: LinkProps) {
    const { html } = context;
    return html`<a href="${href}" class="${classNames(display)}">${text}</a>`;
}
