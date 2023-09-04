import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import baseStyles from '../../global-css/base.css.js';
export interface LinkProps {
    href: string;
    text: string;
    display?: {
        active?: boolean;
        underlined?: boolean;
        bold?: boolean;
    };
}

export function link({ text, href, display = {} }: LinkProps) {
    return html`<a
        href="${href}"
        class="${classMap({
            [baseStyles.active]: display.active,
            [baseStyles.underlined]: display.underlined,
            [baseStyles.bold]: display.bold,
        })}"
        >${text}</a
    >`;
}
