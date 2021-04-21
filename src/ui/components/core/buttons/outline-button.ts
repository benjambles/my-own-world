import type { LitTpl } from '../../../utils/templates/lit-tpl';
import baseStyles from '../../global-css/base.css.json';
import type { ButtonSizes, ButtonTypes } from './types';

interface ButtonData {
    text: string;
    type?: ButtonTypes;
    action?: string;
    size?: ButtonSizes;
}

export const outlineButton: LitTpl<ButtonData> = (
    context,
    { text, type = 'button', action, size = 'normal' }: ButtonData,
) => {
    const {
        html,
        directives: { ifDefined, classMap },
    } = context;

    const cssClasses = classMap({
        [baseStyles.button]: true,
        [baseStyles.buttonOutline]: true,
        [baseStyles.buttonLarge]: size === 'large',
        [baseStyles.buttonSmall]: size === 'small',
    });

    return html`
        <button type="${type}" class="${cssClasses}" data-action="${ifDefined(action)}">
            ${text}
        </button>
    `;
};
