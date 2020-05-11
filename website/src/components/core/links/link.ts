import classNames from 'classnames';
import type { LitTpl } from '../../../utils/templates/lit-tpl';
import baseStyles from '../../global-css/base.css.json';

export type LinkProps = {
    href: string;
    text: string;
    display?: {
        active?: boolean;
        underlined?: boolean;
        bold?: boolean;
    };
};

export const link: LitTpl<LinkProps> = (context, { text, href, display = {} }: LinkProps) => {
    const { html } = context;
    return html`<a
        href="${href}"
        class="${classNames({
            [baseStyles.active]: display.active,
            [baseStyles.underlined]: display.underlined,
            [baseStyles.bold]: display.bold,
        })}"
        >${text}</a
    >`;
};
