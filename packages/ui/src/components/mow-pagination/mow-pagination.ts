import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { composedEvent } from '../../utils/events.js';
import { callOutStyles } from '../../global-css/callout.styles.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';

export type PaginationDetails = {
    limit: number;
    offset: number;
};

@customElement('mow-pagination')
export class MowPagination extends LitElement {
    static styles = [
        callOutStyles,
        css`
            * {
                box-sizing: border-box;
            }

            :host {
                --pg-margin: var(--pagination-margin, 15px auto);
                --link-color: var(--pagination-link-color, rgb(0, 0, 0));
                --link-hover: var(--pagination-link-hover, rgb(249, 81, 74));
                --link-active: var(--pagination-link-hover, rgb(64, 64, 64));
                --link-disabled: var(--pagination-link-color, rgb(250, 250, 250));
            }

            ol {
                list-style: none;
                display: flex;
                flex-direction: row;
                gap: 10px;
                margin: var(--pg-margin);
                padding: 0;
            }

            a,
            .placeholder {
                display: inline-block;
                padding: 10px 20px;
                text-decoration: none;
                font-size: 1.8rem;
                color: var(--link-color);
            }

            .placeholder {
                padding: 10px;
                position: relative;
            }

            a:is(.active) {
                --co-bg-color: var(--link-active);
                color: white;
                outline: none;
                cursor: not-allowed;
            }

            .placeholder:focus-within,
            a:is(:hover, :focus, :focus-visible) {
                --co-bg-color: var(--link-hover);
                color: white;
                outline: none;
            }

            a:is(.disabled) {
                --co-bg-color: var(--link-disabled);
                color: #c9c9c9;
                outline: none;
                cursor: not-allowed;
            }

            select {
                appearance: none;
                max-block-size: 3rem;
                text-indent: calc(50% - -24.5px);
                border: 0;
                background: 0 0;
                position: relative;
                display: block;
                padding: 1.0625rem 0.25rem;
                outline: 0;
                min-inline-size: 3rem;
                text-align: center;
                transition:
                    background-color 110ms cubic-bezier(0.2, 0, 0.38, 0.9),
                    color 110ms cubic-bezier(0.2, 0, 0.38, 0.9);
                user-select: none;
            }

            .icon-wrapper {
                position: absolute;
                block-size: 100%;
                inline-size: 100%;
                inset-block-start: 0;
                pointer-events: none;
                top: 0;
                left: 0;
            }

            .icon-wrapper svg {
                position: absolute;
                inset-block-start: calc(50% - 0.8rem);
                inset-inline-start: calc(50% - 0.8rem);
                pointer-events: none;
            }
        `,
    ];

    private defaultCount = 10;

    @property()
    accessor clickEventName = 'mow:pagination.click';

    @property({ type: Number })
    accessor itemCount: number = 0;

    @property({ type: Number })
    accessor limit: number = 30;

    @property({ type: Number })
    accessor offset: number = 0;

    @property({ type: Number })
    accessor maxLinks: number = this.defaultCount;

    @property()
    accessor rootUrl = '/';

    private requestPaginate(data: PaginationDetails) {
        this.dispatchEvent(composedEvent(this.clickEventName, data));
    }

    private renderLink({
        ariaLabel,
        isActive = false,
        isDisabled = false,
        offset,
        text,
    }) {
        return html`
            <li>
                <a
                    @click=${(e) => {
                        e.preventDefault();
                        if (isDisabled) return;

                        this.requestPaginate({
                            limit: this.limit,
                            offset,
                        });
                    }}
                    class="${classMap({
                        active: isActive,
                        callout: true,
                        disabled: isDisabled,
                    })}"
                    href="${this.rootUrl}?limit=${this.limit}&offset=${offset}"
                    aria-label="${ariaLabel}"
                    aria-disabled=${isDisabled}
                    >${text}
                </a>
            </li>
        `;
    }

    private renderOffset(fromIndex = NaN, count = NaN) {
        if (count <= 0 || isNaN(count)) {
            return null;
        }

        if (count === 1) {
            return this.renderLink({
                ariaLabel: `Goto page ${fromIndex + 1}`,
                offset: fromIndex * this.limit,
                text: fromIndex + 1,
            });
        }

        return html`<li>
            <div class="callout placeholder">
                <select
                    aria-label="Select page number"
                    @change=${(e) => {
                        e.preventDefault();
                        if (!e.target.value) return;

                        this.requestPaginate({
                            limit: this.limit,
                            offset: parseInt(e.target.value, 10),
                        });
                    }}
                >
                    <option value="" hidden></option>
                    ${[...Array(count)].map(
                        (e, i) =>
                            html`<option value="${(fromIndex + i) * this.limit}">
                                ${fromIndex + i + 1}
                            </option>`,
                    )}
                </select>
                <div class="icon-wrapper">
                    <svg
                        focusable="false"
                        preserveAspectRatio="xMidYMid meet"
                        fill="currentColor"
                        width="16"
                        height="16"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        class="cds--pagination-nav__select-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        style="
                                position: absolute;
                                inset-block-start: calc(50% - 0.8rem);
                                inset-inline-start: calc(50% - 0.8rem);
                                pointer-events: none;
                            "
                    >
                        <circle cx="8" cy="16" r="2"></circle>
                        <circle cx="16" cy="16" r="2"></circle>
                        <circle cx="24" cy="16" r="2"></circle>
                    </svg>
                </div>
            </div>
        </li>`;
    }

    private calculateCuts(
        page: number,
        totalItems: number,
        splitPoint: number | null = null,
    ) {
        if (this.maxLinks >= totalItems) {
            return {
                front: 0,
                back: 0,
            };
        }

        const split = splitPoint || Math.ceil(this.maxLinks / 2) - 1;

        let frontHidden = page + 1 - split;
        let backHidden = totalItems - page - (this.maxLinks - split) + 1;

        if (frontHidden <= 1) {
            backHidden -= frontHidden <= 0 ? Math.abs(frontHidden) + 1 : 0;
            frontHidden = 0;
        }

        if (backHidden <= 1) {
            frontHidden -= backHidden <= 0 ? Math.abs(backHidden) + 1 : 0;
            backHidden = 0;
        }

        return {
            front: frontHidden,
            back: backHidden,
        };
    }

    protected render() {
        const pages = Math.max(1, this.itemCount / this.limit);
        const currentPage = this.offset ? Math.max(0, this.offset / this.limit) : 0;
        const nextPage = Math.min(currentPage + 1, pages);
        const previousPage = Math.max(currentPage - 1, 0);
        const cuts = this.calculateCuts(currentPage, pages);
        const startOffset = this.maxLinks <= 4 && currentPage > 1 ? 0 : 1;

        return html`
            <nav aria-label="Pagination">
                <ol>
                    ${this.renderLink({
                        ariaLabel: `Goto previous page, page ${previousPage}`,
                        isDisabled: currentPage === 0,
                        offset: previousPage * this.limit,
                        text: '<',
                    })}
                    ${when(
                        this.maxLinks >= 5 || (this.maxLinks <= 4 && currentPage <= 1),
                        () =>
                            this.renderLink({
                                ariaLabel:
                                    currentPage === 0
                                        ? `Current page, page ${pages}`
                                        : `Goto page ${pages}`,
                                isActive: currentPage === 0,
                                offset: 0,
                                text: 1,
                            }),
                        () => nothing,
                    )}
                    ${this.renderOffset(startOffset, cuts.front)}
                    ${[...Array(pages)]
                        .map((e, i) => i)
                        .slice(startOffset + cuts.front, (1 + cuts.back) * -1)
                        .map((item) =>
                            this.renderLink({
                                ariaLabel:
                                    currentPage === item
                                        ? `Current page, page ${item}`
                                        : `Goto page ${item}`,
                                isActive: currentPage === item,
                                offset: item * this.limit,
                                text: item + 1,
                            }),
                        )}
                    ${this.renderOffset(pages - cuts.back - 1, cuts.back)}
                    ${when(
                        pages > 1,
                        () =>
                            this.renderLink({
                                ariaLabel:
                                    currentPage === pages - 1
                                        ? `Current page, page ${pages - 1}`
                                        : `Goto page ${pages - 1}`,
                                isActive: currentPage === pages - 1,
                                offset: (pages - 1) * this.limit,
                                text: pages,
                            }),
                        () => nothing,
                    )}
                    ${this.renderLink({
                        ariaLabel: `Goto next page, page ${nextPage}`,
                        isDisabled: currentPage === pages - 1,
                        offset: Math.max(
                            0,
                            Math.min(nextPage * this.limit, this.itemCount - this.limit),
                        ),
                        text: '>',
                    })}
                </ol>
            </nav>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mow-pagination': MowPagination;
    }
}
