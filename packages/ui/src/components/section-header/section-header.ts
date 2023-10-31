import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('section-header')
export class SectionHeader extends LitElement {
    static styles = css`
        * {
            box-sizing: border-box;
        }

        :host {
            --border-color: var(--sh-border-color, var(--shade-3));
            --link-color: var(--sh-link-color, var(--special-4));
            --hover-color: var(--sh-hover-color, rgba(0, 191, 255, 0.8));

            display: block;
        }

        header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            height: 101px;
            width: 100%;
            border-bottom: 1px solid var(--border-color);
        }

        ::slotted(a) {
            color: var(--link-color) !important;
        }

        ::slotted(a:is(:hover, :focus-visible)) {
            color: var(--hover-color) !important;
        }

        .breadcrumb {
            display: flex;
            align-items: center;
            gap: 0 15px;
            height: 100%;
            padding: 0 60px;
            border-right: 1px solid var(--border-color);
            white-space: nowrap;
        }

        aside {
            display: flex;
            align-items: center;
            flex-direction: row;
            gap: 0 10px;
            height: 100%;
            margin: 0 6rem;
            padding: 0;
            white-space: nowrap;
        }

        aside ::slotted(a:not(:last-of-type))::after {
            content: '/';
            margin-left: 10px;
            color: black;
        }
    `;

    @property()
    accessor sectionName = 'Home';

    protected render() {
        return html`
            <header>
                <nav class="breadcrumb">
                    <slot name="root-link"><a href="/">Site Root</a></slot> -
                    <span>${this.sectionName}</span>
                </nav>
                <aside>
                    <slot></slot>
                </aside>
            </header>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'section-header': SectionHeader;
    }
}
