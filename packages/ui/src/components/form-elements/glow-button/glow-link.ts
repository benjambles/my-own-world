import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 *
 * @param context - Lit HTML rendering context
 * @param data - Display data
 */
@customElement('glow-link')
export class GlowLink extends LitElement {
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

        a {
            display: block;
            width: 100%;
            padding: 0;
            border: 0 none;
            position: relative;
            background: transparent;
            z-index: 1;
            text-decoration: none;
        }

        a:focus-visible {
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

        a:is(:hover, :focus) .glow {
            background-image: var(--_btn-hv-bg);
        }

        a:is(:hover, :focus) .glow::before {
            background: var(--gradient-glow);
            animation-play-state: running;
        }

        a:focus .glow::after {
            content: ' ';
            border: 1px dotted rgb(0 0 0 / 80%);
            border-radius: 2px;
            position: absolute;
            inset: 5px;
        }
    `;

    @property()
    accessor href = '';

    @property()
    accessor target = '_self';

    protected render() {
        return html`
            <a href=${this.href} target=${this.target}>
                <span class="glow">
                    <slot></slot>
                </span>
            </a>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'glow-link': GlowLink;
    }
}
