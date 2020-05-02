import classNames from 'classnames';
import { clientContext, clientResult } from '../../../utils/templates/client-context';
import { serverContext, serverResult } from '../../../utils/templates/server-context';

export interface BarLinkProps {
    href: string;
    text: string;
    active?: boolean;
}

export function barLink(context: clientContext, data: BarLinkProps): clientResult;
export function barLink(context: serverContext, data: BarLinkProps): serverResult;
export function barLink(context, { text, href, active = false }: BarLinkProps) {
    const { html } = context;
    return html`<a
        href="${href}"
        role="menuitem"
        class="${classNames({ 'link--bar': true, active })}"
        >${text}</a
    >`;
}
