import type { LitTpl } from '../../../utils/templates/lit-tpl';
import baseStyles from '../../global-css/base.css.json';

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
    const {
        html,
        directives: { classMap },
    } = context;
    return html`<a
        href="${href}"
        class="${classMap({
            [baseStyles.active]: display.active,
            [baseStyles.underlined]: display.underlined,
            [baseStyles.bold]: display.bold,
        })}"
        >${text}</a
    >`;
};
