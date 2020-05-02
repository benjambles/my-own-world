import classNames from 'classnames';
import type { LitTpl } from '../../../utils/templates/lit-tpl';

export interface DarkLinkProps {
    href: string;
    text: string;
    display?: {
        active?: boolean;
        underlined?: boolean;
        bold?: boolean;
    };
}

export const darkLink: LitTpl<DarkLinkProps> = (
    context,
    { text, href, display = {} }: DarkLinkProps
) => {
    const { html } = context;
    return html`<a href="${href}" class="${classNames({ 'link--dark': true, ...display })}"
        >${text}</a
    >`;
};
