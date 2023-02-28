import { html } from 'lit';
import { InputProps } from '../form-input-props.js';

interface Checkbox extends InputProps {
    checked: boolean;
    value: string;
}

/**
 *
 * @param props - Display data
 */
export function checkbox({
    checked,
    disabled,
    id,
    label,
    name,
    required,
    value,
}: Checkbox) {
    return html`<label
            ><input
                id=${id}
                name="${name ?? id}"
                type="checkbox"
                ?checked=${checked}
                ?disabled=${disabled}
                ?required=${required}
                .value="${value}"
            />${label}</label
        >
        >`;
}
