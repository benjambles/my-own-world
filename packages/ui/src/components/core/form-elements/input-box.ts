import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

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

export function inputBox({
    id,
    label,
    type = 'text',
    placeholder,
    defaultText = '',
    name,
}: InputData) {
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
