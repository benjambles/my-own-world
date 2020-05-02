import { clientContext, clientResult } from '../../../utils/templates/client-context';
import { serverContext, serverResult } from '../../../utils/templates/server-context';

export interface InputData {
    id: string;
    label: string;
    defaultText?: string;
    name?: string;
    placeholder?: string;
    type?:
        | 'text'
        | 'search'
        | 'tel'
        | 'url'
        | 'email'
        | 'password'
        | 'datetime'
        | 'date'
        | 'month'
        | 'week'
        | 'time'
        | 'datetime-local'
        | 'number';
}

export function inputBox(context: clientContext, data: InputData): clientResult;
export function inputBox(context: serverContext, data: InputData): serverResult;
export function inputBox(
    context,
    { id, label, type = 'text', placeholder, defaultText = '', name }: InputData
) {
    const {
        html,
        directives: { ifDefined },
    } = context;

    return html`
        <label for="${id}">${label}</label>
        <input
            type="${type}"
            value="${defaultText}"
            placeholder=" ${ifDefined(placeholder)}"
            name="${name ? name : id}"
            id="${id}"
        />
    `;
}
