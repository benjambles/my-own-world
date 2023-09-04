import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('filter-bar')
export class FilterBar extends LitElement {
    static styles = css`
        * {
            box-sizing: border-box;
        }

        :host {
            border: 1px solid var(--shade-3);
            border-width: 1px 0;
            display: flex;
            overflow: hidden;
        }
    `;

    render() {
        return html`<slot></slot>`;
    }
}

@customElement('filter-item')
export class FilterItem extends LitElement {
    static styles = css`
        :host {
            --border-color: var(--filter-border, var(--shade-3));
            --highlight-color: var(--filter-color, rgba(255, 0, 0, 0.8));
            --text-color: var(--filter-border, var(--shade-0));
        }

        :host(:first-of-type) a {
            margin-left: -10px;
            padding-left: 30px;
        }

        a {
            transform: skew(20deg, 0deg);
            border-right: 1px solid var(--border-color);
            display: block;
            padding: 0 2rem;
            text-decoration: none;
            color: var(--highlight-color);
        }

        a:hover,
        a:focus-within {
            background: var(--highlight-color);
            border-color: var(--highlight-color);
            color: var(--text-color);
        }

        slot {
            display: block;
            transform: skewX(-20deg);
            padding: 1rem 0rem;
        }
    `;

    @property()
    href;

    @property()
    filter;

    protected render() {
        return html`
            <a href="${this.href}" data-filter="${this.filter}">
                <slot></slot>
            </a>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'filter-bar': FilterBar;
        'filter-item': FilterItem;
    }
}
