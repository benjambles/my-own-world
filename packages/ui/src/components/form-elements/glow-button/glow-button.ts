import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 *
 * @param context - Lit HTML rendering context
 * @param data - Display data
 */
@customElement('glow-button')
export class GlowButton extends LitElement {
    static get formAssociated() {
        return true;
    }

    static styles = css`
        * {
            box-sizing: border-box;
        }

        @keyframes rotate {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        :host {
            --_btn-color: var(--gb-btn-color, #1a1a1a);
            --_btn-hv-bg: var(
                --gb-btn-hover,
                linear-gradient(
                    90deg,
                    rgb(217 217 217 / 70%),
                    rgb(231 231 232 / 70%),
                    rgb(217 217 217 / 70%)
                )
            );
            --_btn-bg: var(
                --gb-btn-bg,
                linear-gradient(
                    90deg,
                    rgb(217 217 217),
                    rgb(231 231 232),
                    rgb(217 217 217)
                )
            );

            display: block;
        }

        :host(.large) {
            --_font-size: 2.2rem;
            --_text-padding: 16px 20px 15px;
            --_font-weight: 300;
        }

        button {
            display: block;
            width: 100%;
            padding: 0;
            border: 0 none;
            position: relative;
            background: transparent;
            z-index: 1;
        }

        button:focus-visible {
            outline: none;
        }

        .glow {
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid transparent;
            border-radius: 6px;
            margin: 0;
            padding: 2px;
            outline: none;
            overflow: hidden;
            position: relative;
            background-image: var(--_btn-bg);
            background-clip: content-box;
            color: var(--_btn-color);
            cursor: pointer;
            font-family: 'Oxanium', monospace;
            font-size: var(--_font-size, 1.6rem);
            font-weight: var(--_font-weight, 500);
            font-variant: small-caps;
            letter-spacing: 0.2ch;
            line-height: 1;
        }

        .glow slot {
            padding: var(--_text-padding, 12px 20px 10px);
            display: block;
        }

        .glow::before {
            content: '';
            margin: -50%;
            position: absolute;
            border-radius: inherit;
            inset: 0;
            animation: rotate 2s linear infinite;
            animation-play-state: paused;
            background: rgb(35 169 232 / 80%);
            transition: opacity 100ms ease-out;
            z-index: -1;
        }

        button:is(:hover, :active, :focus) .glow {
            background-image: var(--_btn-hv-bg);
        }

        button:is(:hover, :active, :focus) .glow::before {
            background: var(--gradient-glow);
            animation-play-state: running;
        }

        button:focus .glow::after {
            content: ' ';
            border: 1px dotted rgb(0 0 0 / 80%);
            border-radius: 2px;
            position: absolute;
            inset: 5px;
        }

        button[disabled] .glow::before,
        button:active .glow::before {
            opacity: 0.5;
        }
    `;

    @property({ attribute: false })
    private accessor internals: ElementInternals;

    connectedCallback() {
        super.connectedCallback();
        this.internals = this.attachInternals();
    }

    handleClick = () => {
        this.internals.form.requestSubmit();
    };

    protected render() {
        return html`
            <button @click=${this.handleClick}>
                <span class="glow">
                    <slot></slot>
                </span>
            </button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'glow-button': GlowButton;
    }
}
