import classNames from 'classnames';
import type { LitTpl } from '../../../utils/templates/lit-tpl';
import baseStyles from '../../global-css/base.css.json';

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
    return html`<a
        href="${href}"
        class="${classNames({
            [baseStyles.linkDark]: true,
            [baseStyles.active]: display.active,
            [baseStyles.underlined]: display.underlined,
            [baseStyles.bold]: display.bold,
        })}"
        >${text}</a
    >`;
};
