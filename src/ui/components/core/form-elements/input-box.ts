import type { LitTpl } from '../../../utils/templates/lit-tpl.js';

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

export const inputBox: LitTpl<InputData> = (
    context,
    { id, label, type = 'text', placeholder, defaultText = '', name }: InputData,
) => {
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
};
