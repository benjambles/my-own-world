import classNames from 'classnames';
import type { LitTpl } from '../../../utils/templates/lit-tpl';

export interface BarLinkProps {
    href: string;
    text: string;
    active?: boolean;
}

export const barLink: LitTpl<BarLinkProps> = (
    context,
    { text, href, active = false }: BarLinkProps
) => {
    const { html } = context;
    return html`<a
        href="${href}"
        role="menuitem"
        class="${classNames({ 'link--bar': true, active })}"
        >${text}</a
    >`;
};
