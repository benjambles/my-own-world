import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export type TextAreaData = {
    defaultText?: string;
    disabled?: boolean;
    id: string;
    label: string;
    maxLength?: number;
    minLength?: number;
    name?: string;
    placeholder?: string;
    required?: boolean;
    value?: string;
};

export function textArea({
    defaultText = '',
    disabled,
    id,
    label,
    maxLength,
    minLength,
    name,
    placeholder,
    required,
}: TextAreaData) {
    return html`
        <label for="${id}">${label}</label>
        <div
            class="${classMap({
                'input-wrapper': true,
                'is-disabled': disabled,
            })}"
        >
            <div class="text-input">
                <textarea
                    ?disabled=${disabled}
                    id="${id}"
                    name="${name ?? id}"
                    placeholder="${ifDefined(placeholder)}"
                    ?required=${required}
                    minlength=${ifDefined(minLength)}
                    maxlength=${ifDefined(maxLength)}
                >
${defaultText}</textarea
                >
            </div>
        </div>
    `;
}
