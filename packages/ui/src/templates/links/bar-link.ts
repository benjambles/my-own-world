import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import baseStyles from '../../global-css/base.css.js';

export interface BarLinkProps {
    href: string;
    text: string;
    active?: boolean;
}

export function barLink({ text, href, active = false }: BarLinkProps) {
    return html`<a
        href="${href}"
        role="menuitem"
        class="${classMap({
            [baseStyles.linkBar]: true,
            [baseStyles.active]: active,
        })}"
        >${text}</a
    >`;
}
