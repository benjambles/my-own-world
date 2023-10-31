import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { composedEvent } from '../../utils/events.js';

export type PaginationDetails = {
    limit: number;
    offset: number;
};

@customElement('mow-pagination')
export class MowPagination extends LitElement {
    static styles = css`
        * {
            box-sizing: border-box;
        }
    `;

    @property()
    accessor rootUrl = '/';

    @property()
    accessor clickEventName = 'mow:pagination.click';

    @property({ type: Number })
    accessor itemCount: number = 0;

    @property({ type: Number })
    accessor limit: number = 30;

    @property({ type: Number })
    accessor offset: number = 0;

    private requestPaginate(data: PaginationDetails) {
        this.dispatchEvent(composedEvent(this.clickEventName, data));
    }

    protected render() {
        const pages = Math.max(1, this.itemCount / this.limit);
        const currentPage = this.offset ? Math.max(1, this.offset / this.limit) : 1;

        return html`<nav>
            ${Array.from({ length: pages }, (count, index) => {
                const offset = index ? index * this.limit : 0;

                return count === currentPage
                    ? html`<span>${count}</span>`
                    : html`<a
                          @click=${(e) => {
                              e.preventDefault();
                              this.requestPaginate({ limit: this.limit, offset });
                          }}
                          href="${this.rootUrl}?limit=${this.limit}&offset=${offset}"
                      >
                          ${count}
                      </a>`;
            })}
        </nav> `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mow-pagination': MowPagination;
    }
}
