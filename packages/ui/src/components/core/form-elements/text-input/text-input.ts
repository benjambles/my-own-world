import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { lazyStylesheet } from '../../../utils/lazy-stylesheet.js';
import { InputProps } from '../form-input-props.js';
import styles from './text-input.css.js';

export interface TextInputData extends InputProps {
    defaultText?: string;
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
    disabled,
    id,
    label,
    placeholder,
    name,
    required,
    defaultText = '',
    type = 'text',
}: TextInputData) {
    return html`
        ${lazyStylesheet('/mow-ui/styles/core/form-elements/text-input.css')}
        <label class=${styles.label} for="${id}">${label}</label>
        <div class=${styles.inputWrapper}>
            <div class=${styles.textInput}>
                <input
                    id="${id}"
                    name="${name ?? id}"
                    placeholder="${ifDefined(placeholder)}"
                    type="${type}"
                    ?disabled=${disabled}
                    ?required=${required}
                    .value="${defaultText}"
                />
            </div>
        </div>
    `;
}
