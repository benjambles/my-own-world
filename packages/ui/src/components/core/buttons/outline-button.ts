import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import baseStyles from '../../global-css/base.css.js';
import type { ButtonSizes, ButtonTypes } from './types.js';

interface ButtonData {
    text: string;
    type?: ButtonTypes;
    action?: string;
    size?: ButtonSizes;
}

export function outlineButton({ text, type = 'button', action, size = 'normal' }: ButtonData) {
    const cssClasses = {
        [baseStyles.button]: true,
        [baseStyles.buttonOutline]: true,
        [baseStyles.buttonLarge]: size === 'large',
        [baseStyles.buttonSmall]: size === 'small',
    };

    return html`
        <button type="${type}" class="${classMap(cssClasses)}" data-action="${ifDefined(action)}">
            ${text}
        </button>
    `;
}
