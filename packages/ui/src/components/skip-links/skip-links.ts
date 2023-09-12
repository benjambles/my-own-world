import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('skip-links')
export class SkipLinks extends LitElement {
    static styles = css`
        * {
            box-sizing: border-box;
        }

        ::slotted(a) {
            height: 1px;
            width: 1px;
            border: 0;
            margin: -1px;
            padding: 0;
            overflow: hidden;
            position: fixed;
            top: 0;
            clip: rect(1px, 1px, 1px, 1px);
            clip-path: inset(50%);
            transition: top 0.5s;
            z-index: 100;
        }

        ::slotted(a:focus),
        ::slotted(a:target) {
            display: flex;
            flex-direction: column;
            height: auto;
            width: auto;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            left: 1rem;
            top: 1rem;
            clip: auto;
            clip-path: none;
            background: var(--special-4);
            color: var(--shade-0) !important;
        }
    `;

    protected render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'skip-links': SkipLinks;
    }
}
