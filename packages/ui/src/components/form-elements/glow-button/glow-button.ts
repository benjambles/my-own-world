import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 *
 * @param context - Lit HTML rendering context
 * @param data - Display data
 */
@customElement('glow-button')
export class GlowButton extends LitElement {
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

        button {
            padding: 0;
            border: 0 none;
            position: relative;
            background: transparent;
            z-index: 1;
        }

        .glow {
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid transparent;
            border-radius: 8px;
            border-top-left-radius: 7px;
            border-bottom-right-radius: 7px;
            margin: 12px 4px;
            padding: 2px;
            outline: none;
            overflow: hidden;
            position: relative;
            background-color: #223344;
            background-clip: content-box;
            color: white;
            cursor: pointer;
            font-family: 'Oxanium', monospace;
            font-weight: 500;
            letter-spacing: 0.3ch;
            line-height: 1;
            text-transform: uppercase;
            transition: background-color 150ms ease-out;
        }

        .glow span {
            padding: 12px 20px 10px;
        }

        .glow::before {
            content: '';
            margin: -60px;
            position: absolute;
            border-radius: inherit;
            inset: 0;
            animation: rotate 2s linear infinite;
            animation-play-state: paused;
            background-image: var(--gradient-glow);
            transition: opacity 100ms ease-out;
            z-index: -1;
        }

        button:hover .glow,
        button:active .glow,
        button:focus .glow {
            background-color: #223344cc;
        }

        button:hover .glow::before,
        button:active .glow::before,
        button:focus .glow::before {
            background: linear-gradient(200deg, red, lightgreen) !important;
            animation: rotate 2s linear infinite;
        }

        button:focus .glow::after {
            content: ' ';
            border: 1px dotted rgba(255, 255, 255, 0.5);
            border-radius: 2px;
            position: absolute;
            inset: 5px;
        }

        button[disabled] .glow::before,
        button:active .glow::before {
            opacity: 0.5;
        }
    `;

    protected render() {
        return html`
            <button>
                <span class="glow">
                    <span><slot></slot></span>
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
