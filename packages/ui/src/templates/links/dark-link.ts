import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import baseStyles from '../../global-css/base.css.js';
export interface DarkLinkProps {
    href: string;
    text: string;
    display?: {
        active?: boolean;
        underlined?: boolean;
        bold?: boolean;
    };
}

export function darkLink({ text, href, display = {} }: DarkLinkProps) {
    return html`<a
        href="${href}"
        class="${classMap({
            [baseStyles.linkDark]: true,
            [baseStyles.active]: display.active,
            [baseStyles.underlined]: display.underlined,
            [baseStyles.bold]: display.bold,
        })}"
        >${text}</a
    >`;
}
