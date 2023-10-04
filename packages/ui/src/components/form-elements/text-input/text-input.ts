import { css, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

export type TextInputData = {
    defaultText?: string;
    disabled?: boolean;
    id: string;
    label: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
    type?:
        | 'date'
        | 'datetime-local'
        | 'email'
        | 'month'
        | 'number'
        | 'password'
        | 'search'
        | 'tel'
        | 'text'
        | 'time'
        | 'url'
        | 'week';
    value?: string;
};

export const inputStyles = css`
    .input-wrapper {
        display: flex;
        position: relative;
        z-index: 1;
    }

    label,
    .label {
        display: block;
        margin-top: 20px;
        font-family: 'Oxanium', monospace;
        font-size: 1.6rem;
        font-weight: 300;
        letter-spacing: 0.2ch;
    }

    textarea {
        resize: vertical;
        min-height: 150px;
    }

    .text-input {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        border: 2px solid transparent;
        border-radius: 4px;
        padding: 2px;
        margin-top: 5px;
        overflow: hidden;
        position: relative;
        background-clip: content-box;
        font-size: 1.6rem;
    }

    .text-input::before {
        content: '';
        margin: 0;
        border-radius: inherit;
        position: absolute;
        inset: 0;
        background: rgb(35 169 232 / 80%);
        z-index: -1;
    }

    .text-input :is(input, textarea) {
        width: 100%;
        padding: 12px 15px 10px;
        border: 0 none;
        border-radius: 2px;
        font-family: var(--font-text);
        font-size: 1.6rem;
    }

    .text-input :is(input, textarea):focus-visible {
        filter: opacity(0.9);
        outline: none;
    }

    /* .input-wrapper:focus-within:before {
        content: '◣';
        color: #aae8a1;
        position: absolute;
        left: 2px;
        z-index: 2;
        bottom: -3px;
        font-size: 18px;
    } */

    .input-wrapper:focus-within:after {
        content: '◥';
        position: absolute;
        right: 2px;
        top: 0;
        color: rgb(255 0 255 / 0.8);
        font-size: 18px;
        z-index: 2;
    }

    .input-wrapper:has(:hover, :focus-within) .text-input::before {
        background: var(--gradient-glow);
    }

    ::-webkit-calendar-picker-indicator {
        filter: invert(77%) sepia(46%) saturate(3126%) hue-rotate(172deg) brightness(100%)
            contrast(84%);
    }

    .input-wrapper:has(:hover, :focus-within) ::-webkit-calendar-picker-indicator {
        filter: invert(15%) sepia(86%) saturate(6721%) hue-rotate(295deg) brightness(85%)
            contrast(120%);
    }
`;

export function textInput({
    defaultText = '',
    disabled,
    id,
    label,
    placeholder,
    name,
    required,
    type = 'text',
}: TextInputData) {
    return html`
        <label for="${id}">${label}</label>
        <div class="input-wrapper">
            <div class="text-input">
                <input
                    ?disabled=${disabled}
                    id="${id}"
                    name="${name ?? id}"
                    placeholder="${ifDefined(placeholder)}"
                    type="${type}"
                    ?required=${required}
                    .value="${defaultText}"
                />
            </div>
        </div>
    `;
}
