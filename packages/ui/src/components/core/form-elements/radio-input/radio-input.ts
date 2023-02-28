import { html } from 'lit';
import { InputProps } from '../form-input-props.js';

interface RadioInput extends InputProps {
    checked: boolean;
    value: string;
}

/**
 *
 * @param props - Display data
 */
export function radioInput({
    checked,
    disabled,
    id,
    label,
    name,
    required,
    value,
}: RadioInput) {
    return html`<label
            ><input
                id=${id}
                name="${name ?? id}"
                type="radio"
                ?checked=${checked}
                ?disabled=${disabled}
                ?required=${required}
                .value="${value}"
            />${label}</label
        >
        >`;
}
