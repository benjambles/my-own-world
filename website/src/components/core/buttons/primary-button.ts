import { clientContext, clientResult } from '../../../utils/client-context';
import { serverContext, serverResult } from '../../../utils/server-context';

export interface ButtonData {
    text: string;
    type?: string;
    action?: string;
}

export function PrimaryButton(context: clientContext, data: ButtonData): clientResult;
export function PrimaryButton(context: serverContext, data: ButtonData): serverResult;
export function PrimaryButton(context, { text, type = 'button', action }: ButtonData) {
    const {
        html,
        directives: { ifDefined },
    } = context;

    return html`<button type="${type}" data-action="${ifDefined(action)}">${text}</button>`;
}
