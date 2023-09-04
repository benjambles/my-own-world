import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MowDetails } from '../mow-details/mow-details.js';

@customElement('fixed-header')
export class FixedHeader extends MowDetails {
    static styles = css`
        * {
            box-sizing: border-box;
        }

        :host {
            --border-color: var(--header-border-color, #404041);
            --bg-color: var(--header-bg-color, #1a1a1a);
            --text-color: var(--header-text-color, #fff);
            --btn-hover-bg: var(--header-btn-bg-hover, rgba(255, 0, 0, 0.8));
            --link-text-color: var(--header-link-text, #fff);
            --menu-bg: var(--header-menu-bg, #1a1a1a);
            --menu-btn-font: var(--header-menu-btn-font, 3rem);

            height: 60px;
            width: 100%;
            border-bottom: 1px solid var(--border-color);
            position: fixed;
            inset: 0;
            z-index: 2;
            background-color: var(--bg-color);
            color: var(--text-color);
        }

        header {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0 20px;
            height: 100%;
        }

        .account-links {
            padding-right: 20px;
        }

        .logo {
            flex: 1;
            text-align: center;
        }

        details summary {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 60px;
            width: 60px;
            border-bottom: 1px solid var(--border-color);
            font-size: var(--menu-btn-font);
            cursor: pointer;
        }

        details[open] summary,
        details summary:hover,
        details summary:focus {
            background-color: var(--btn-hover-bg);
            color: var(--link-text-color);
        }

        details summary:focus {
            box-shadow: inset 0 0 0px 2px #ff8d00;
            outline: none;
        }

        .navigation-panel {
            display: flex;
            overflow: hidden;
            position: absolute;
            inset: 60px 0 0;
        }

        details[open] .navigation-panel {
            inset: 60px 0 calc(-100vh + 60px);
        }

        @media screen and (min-width: 992px) {
            :host {
                height: 100%;
                width: 100px;
                border-bottom-width: 0;
                border-right: 1px solid var(--border-color);
                inset: 0;
            }

            header {
                flex-direction: column;
            }

            .account-links {
                padding-right: 0;
                padding-bottom: 20px;
                writing-mode: tb;
            }

            .logo {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            details summary {
                height: 100px;
                width: 100px;
            }

            details[open] .navigation-panel {
                inset: 0 calc(-100vw + 100px) 0 100px;
            }

            .navigation-panel {
                inset: 0 calc(-100vw + 100px) 100px 100px;
            }
        }
    `;

    render() {
        return html`
            <header>
                <details @toggle=${this.handleToggle}>
                    <summary aria-haspopup="true" role="button">
                        <slot name="button-text">&#9776;</slot>
                    </summary>
                    <div class="navigation-panel" role="menu">
                        <slot name="nav-menu"></slot>
                    </div>
                </details>
                <div class="logo"><slot name="logo"></slot></div>
                <div class="account-links"><slot name="account-menu"></slot></div>
            </header>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'fixed-header': FixedHeader;
    }
}
