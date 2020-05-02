import classNames from 'classnames';
import type { LitTpl } from '../../../utils/templates/lit-tpl';

export interface LinkProps {
    href: string;
    text: string;
    display?: {
        active?: boolean;
        underlined?: boolean;
        bold?: boolean;
    };
}

export const link: LitTpl<LinkProps> = (context, { text, href, display = {} }: LinkProps) => {
    const { html } = context;
    return html`<a href="${href}" class="${classNames(display)}">${text}</a>`;
};
