import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('site-footer')
export class SiteFooter extends LitElement {
    static styles = css`
        * {
            box-sizing: border-box;
        }

        footer {
            padding: 40px 20px;
            border-top: 1px solid var(--shade-3);
            font-size: 1.3rem;
        }

        .container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            max-width: 1200px;
            margin: 0 auto;
            font-size: 1.8rem;
        }

        .links ::slotted(a) {
            padding: 0 0 0 20px;
        }

        .links ::slotted(a:is(:hover, focus)) {
            text-decoration: underline !important;
        }
    `;

    static CurrentYear = new Date().getFullYear();

    protected render() {
        return html`
            <footer id="footer">
                <div class="container">
                    <span>
                        &copy; <slot name="site-name"></slot> - ${SiteFooter.CurrentYear}
                    </span>
                    <div class="links" role="list">
                        <slot></slot>
                    </div>
                </div>
            </footer>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'site-footer': SiteFooter;
    }
}
