import { clientContext, clientResult } from '../../../utils/client-context';
import { serverContext, serverResult } from '../../../utils/server-context';

export interface InputData {
    id: string;
    label: string;
    defaultText?: string;
    name?: string;
    placeholder?: string;
    type?: string;
}

export function InputBox(context: clientContext, data: InputData): clientResult;
export function InputBox(context: serverContext, data: InputData): serverResult;
export function InputBox(
    context,
    { id, label, type = 'text', placeholder, defaultText = '', name }: InputData
) {
    const { html } = context;

    return html`
        <label for="${id}">${label}</label>
        <input
            type="${type}"
            value="${defaultText}"
            ?placeholder="${placeholder}"
            name="${name ? name : id}"
            id="${id}"
        />
    `;
}
