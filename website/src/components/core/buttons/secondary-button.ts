import { clientContext, clientResult } from '../../../utils/client-context';
import { serverContext, serverResult } from '../../../utils/server-context';

export interface ButtonData {
    text: string;
    type?: 'button' | 'submit';
    action?: string;
    size?: 'large' | 'normal' | 'small';
}

export function SecondaryButton(context: clientContext, data: ButtonData): clientResult;
export function SecondaryButton(context: serverContext, data: ButtonData): serverResult;
export function SecondaryButton(
    context,
    { text, type = 'button', action, size = 'normal' }: ButtonData
) {
    const {
        html,
        directives: { ifDefined, classMap },
    } = context;

    const cssClasses = classMap({
        button: true,
        'button--large': size === 'large',
        'button--small': size === 'small',
    });

    return html`<button type="${type}" class="${cssClasses}" data-action="${ifDefined(action)}">
        ${text}
    </button>`;
}
