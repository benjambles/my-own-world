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
        @keyframes rotate {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        button {
            position: relative;
            z-index: 1;
            background: transparent;
            border: 0 none;
            padding: 0;
        }

        .glow {
            align-items: center;
            background-color: #223344;
            box-sizing: border-box;
            background-clip: content-box;
            border: 2px solid transparent;
            border-radius: 8px;
            border-top-left-radius: 7px;
            border-bottom-right-radius: 7px;
            color: white;
            cursor: pointer;
            display: flex;
            justify-content: center;
            margin: 12px 4px;
            outline: none;
            overflow: hidden;
            padding: 2px;
            position: relative;
            transition: background-color 150ms ease-out;
            text-transform: uppercase;
            font-family: 'Oxanium', monospace;
            font-weight: 500;
            letter-spacing: 0.3ch;
            line-height: 1;
        }

        .glow span {
            padding: 12px 20px 10px;
        }

        .glow::before {
            content: '';
            position: absolute;
            inset: 0;
            z-index: -1;
            margin: -60px;
            border-radius: inherit;
            background-image: var(--gradient-glow);
            transition: opacity 100ms ease-out;
            animation: rotate 2s linear infinite;
            animation-play-state: paused;
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

        button[disabled] .glow::before,
        button:active .glow::before {
            opacity: 0.5;
        }

        button:focus .glow::after {
            content: ' ';
            position: absolute;
            inset: 5px;
            border: 1px dotted rgba(255, 255, 255, 0.5);
            border-radius: 2px;
        }
    `;

    render() {
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
