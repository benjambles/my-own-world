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

            container: navbar / inline-size;
            height: 60px;
            width: 100%;
            position: fixed;
            inset: auto 0 0 0;
            background-color: var(--bg-color);
            color: var(--text-color);
            z-index: 2;
        }

        header {
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            gap: 0 20px;
            height: 100%;
        }

        .account-links {
            --auth-btn-size: 60px;
            display: block;
            border-right: 1px solid rgb(68, 68, 68);
        }

        .logo {
            flex: 1;
            text-align: center;
        }

        summary {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 60px;
            width: 61px;
            border-left: 1px solid var(--border-color);
            font-size: var(--menu-btn-font);
            cursor: pointer;
        }

        details[open] summary,
        summary:is(:hover, :focus) {
            background-color: var(--btn-hover-bg);
            color: var(--link-text-color);
        }

        summary:focus {
            box-shadow: inset 0 0 0px 2px #ff8d00;
            outline: none;
        }

        .navigation-panel {
            display: flex;
            overflow: hidden;
            position: absolute;
            inset: 0 0 60px;
        }

        details[open] .navigation-panel {
            inset: calc(-100vh + 60px) 0px 60px;
        }

        @media screen and (min-width: 992px) {
            :host {
                height: 100%;
                width: 100px;
                inset: 0;
            }

            header {
                flex-direction: column;
            }

            .account-links {
                --auth-btn-size: 100px;
                border-right: 0px none;
                border-top: 1px solid rgb(68, 68, 68);
            }

            .logo {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            summary {
                height: 101px;
                width: 100px;
                border-bottom: 1px solid var(--border-color);
            }

            .navigation-panel {
                inset: 0 calc(-100vw + 100px) 100px 100px;
            }

            details[open] .navigation-panel {
                inset: 0 calc(-100vw + 100px) 0 100px;
            }
        }
    `;

    protected render() {
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
                <slot class="account-links" name="account-button"></slot>
            </header>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'fixed-header': FixedHeader;
    }
}
