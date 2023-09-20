import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('filter-bar')
export class FilterBar extends LitElement {
    static styles = css`
        * {
            box-sizing: border-box;
        }

        :host {
            --_border: var(--fb-border, 1px solid var(--shade-3));
            display: flex;
            border: var(--_border);
            border-inline-width: 0;
            overflow: hidden;
        }
    `;

    protected render() {
        return html`<slot></slot>`;
    }
}

@customElement('filter-item')
export class FilterItem extends LitElement {
    static styles = css`
        :host {
            --_border: var(--fi-border, 1px solid var(--shade-3));
            --_highlight-color: var(--fi-color-highlight, rgba(255, 0, 0, 0.8));
            --_color: var(--fi-color, var(--shade-0));
            --_offset: var(--fi-offset, -10px);
        }

        :host(:first-of-type) a {
            margin-inline-start: var(--_offset);
            padding-inline-start: 30px;
        }

        a {
            display: block;
            padding-inline: 2rem;
            border-inline-end: var(--_border);
            color: var(--highlight-color);
            text-decoration: none;
            transform: skewX(20deg);
        }
        a:is(:hover, :focus-within) {
            background: var(--_highlight-color);
            border-color: var(--_highlight-color);
            color: var(--_color);
        }

        slot {
            display: block;
            padding-block: 1rem;
            transform: skewX(-20deg);
        }
    `;

    @property()
    filter;

    @property()
    href;

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
