import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
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
            active: display.active,
            underlined: display.underlined,
            bold: display.bold,
        })}"
        >${text}</a
    >`;
}
