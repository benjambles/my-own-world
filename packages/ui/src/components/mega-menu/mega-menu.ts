import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('mega-menu')
export class MegaMenu extends LitElement {
    static styles = css`
        * {
            box-sizing: border-box;
        }

        :host {
            --menu-bg: var(--mega-menu-bg, #111);
            --text-color: var(--mega-menu-text, #eee);
            width: 100%;
        }

        nav {
            flex: 1 1 100%;
            display: flex;
            flex-direction: column;
            gap: 30px;
            height: 100%;
            width: 100%;
            padding: 4rem 6rem;
            overflow: auto;
            background-color: var(--menu-bg);
            color: var(--text-color);

            /* Hiding scrollbar for IE, Edge and Firefox */
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE and Edge */
        }

        /* Hiding scrollbar for Chrome, Safari and Opera */
        nav::-webkit-scrollbar {
            display: none;
        }

        nav ::slotted(labelled-list) {
            flex: 1 1 100%;
            margin: 0 0 2rem;
            padding: 0 0 2rem;
            border-bottom: 1px solid var(--shade-3);
        }

        @media screen and (min-width: 992px) {
            nav {
                flex-direction: row;
            }

            nav ::slotted(labelled-list) {
                border-bottom: none;
            }

            nav ::slotted(labelled-list:first-of-type) {
                margin-top: 100px;
            }
        }
    `;

    protected render() {
        return html`<nav><slot></slot></nav>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mega-menu': MegaMenu;
    }
}
