import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { lazyStylesheet } from '../../utils/lazy-stylesheet.js';
import styles from './text-input.css.js';

export interface TextInputData {
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
        | 'date'
        | 'month'
        | 'week'
        | 'time'
        | 'datetime-local'
        | 'number';
}

export function textInput({
    id,
    label,
    placeholder,
    name,
    defaultText = '',
    type = 'text',
}: TextInputData) {
    return html`
        ${lazyStylesheet('/styles/core/form-elements/text-input.css')}
        <label class=${styles.label} for="${id}">${label}</label>
        <div class=${styles.inputWrapper}>
            <div class=${styles.textInput}>
                <input
                    type="${type}"
                    value="${defaultText}"
                    placeholder="${ifDefined(placeholder)}"
                    name="${name ? name : id}"
                    id="${id}"
                />
            </div>
        </div>
    `;
}
