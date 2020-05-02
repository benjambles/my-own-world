import type { LitTpl } from '../../../utils/templates/lit-tpl';

export interface ButtonData {
    text: string;
    type?: 'button' | 'submit';
    action?: string;
    size?: 'large' | 'normal' | 'small';
}

export const outlineButton: LitTpl<ButtonData> = (
    context,
    { text, type = 'button', action, size = 'normal' }: ButtonData
) => {
    const {
        html,
        directives: { ifDefined, classMap },
    } = context;

    const cssClasses = classMap({
        button: true,
        'button--outline': true,
        'button--large': size === 'large',
        'button--small': size === 'small',
    });

    return html`<button type="${type}" class="${cssClasses}" data-action="${ifDefined(action)}">
        ${text}
    </button>`;
};
