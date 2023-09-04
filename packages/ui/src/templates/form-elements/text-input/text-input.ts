import { css, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { InputProps } from '../form-input-props.js';

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

export const inputStyles = css`
    .input-wrapper {
        position: relative;
        z-index: 1;
    }

    label {
        display: block;
        margin-top: 20px;
        font-size: 1.6rem;
        font-family: 'Oxanium', monospace;
        letter-spacing: 0.2ch;
        font-weight: 300;
    }

    .text-input {
        align-items: center;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 4px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 10px;
        margin-top: 5px;
        font-size: 1.6rem;
        overflow: hidden;
        position: relative;
        padding: 2px;
    }

    .text-input::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        margin: 0;
        border-radius: inherit;
        background-image: var(--gradient-glow);
    }

    .text-input input {
        padding: 12px 20px 10px;
        width: 100%;
        border: 0 none;
        border-radius: 2px;
    }

    .text-input input:focus-visible {
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
        color: #f15148;
        position: absolute;
        right: 2px;
        z-index: 2;
        top: 0;
        font-size: 18px;
    }

    .input-wrapper:has(:hover, :focus-within) .text-input::before {
        background: var(--gradient-glow-reverse);
    }

    ::-webkit-calendar-picker-indicator {
        filter: invert(15%) sepia(86%) saturate(6721%) hue-rotate(295deg) brightness(85%)
            contrast(120%);
    }

    .input-wrapper:has(:hover, :focus-within) ::-webkit-calendar-picker-indicator {
        filter: invert(7%) sepia(88%) saturate(7111%) hue-rotate(0deg) brightness(115%)
            contrast(104%);
    }
`;

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
        <label for="${id}">${label}</label>
        <div class="input-wrapper">
            <div class="text-input">
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
