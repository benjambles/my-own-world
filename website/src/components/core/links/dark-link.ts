import classNames from 'classnames';
import { clientContext, clientResult } from '../../../utils/templates/client-context';
import { serverContext, serverResult } from '../../../utils/templates/server-context';

export interface DarkLinkProps {
    href: string;
    text: string;
    display?: {
        active?: boolean;
        underlined?: boolean;
        bold?: boolean;
    };
}

export function darkLink(context: clientContext, data: DarkLinkProps): clientResult;
export function darkLink(context: serverContext, data: DarkLinkProps): serverResult;
export function darkLink(context, { text, href, display = {} }: DarkLinkProps) {
    const { html } = context;
    return html`<a href="${href}" class="${classNames({ 'link--dark': true, ...display })}"
        >${text}</a
    >`;
}
