import '@benjambles/mow-ui/components/filter-bar/filter-bar.js';
import { PaginationDetails } from '@benjambles/mow-ui/components/mow-pagination/mow-pagination.js';
import { MowApiInstance, requestContext } from '@benjambles/mow-ui/contexts/request.js';
import { time } from '@benjambles/mow-ui/core.js';
import { callOutStyles } from '@benjambles/mow-ui/styles.js';
import { consume } from '@lit-labs/context';
import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { UserData, userContext } from '../../../../layouts/components/with-user/user.js';
import { Skirmish } from '../index.js';
import { SkirmishApi, SkirmishApiInstance } from './skirmish-api.js';

@customElement('skirmish-list')
export class SkirmishList extends LitElement {
    private skirmishApi: SkirmishApiInstance;

    static ClickEventName = 'skirmishlistpaginate';

    static styles = [
        callOutStyles,
        css`
            * {
                box-sizing: border-box;
            }

            .card-list slot {
                list-style: none;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));
                grid-auto-rows: minmax(100px, auto);
                gap: 30px;
                padding: 0;
                margin: 50px 0;
            }

            .callout {
                --co-bg-color: #ccc;
                grid-column: 1 / -1;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                font-variant: small-caps;
                font-family: var(--font-special);
                padding: 150px 0;
                margin: 0;
            }
        `,
    ];

    @property()
    rootUrl = '/';

    @property()
    rosterUrl = '/:rosterId';

    @property({ type: Number })
    count: number = 0;

    @property({ type: Number })
    limit: number = 30;

    @property({ type: Number })
    offset: number = 0;

    @consume({ context: userContext, subscribe: true })
    @property({ attribute: false })
    userData: UserData;

    @consume({ context: requestContext, subscribe: true })
    @property({ attribute: false })
    requestManager: MowApiInstance;

    @state()
    skirmishes: Skirmish[] = [];

    connectedCallback() {
        super.connectedCallback();

        this.addEventListener(SkirmishList.ClickEventName, this.fetchSkirmishes);

        if (this.requestManager) {
            this.skirmishApi = new SkirmishApi();
            this.skirmishApi.addManager(this.requestManager);
        }
    }

    private fetchSkirmishes = async (e: CustomEvent<PaginationDetails>) => {
        e.preventDefault();

        if (!this.skirmishApi) {
            throw new Error('No request manager registered');
        }

        try {
            const { count, items } = await this.skirmishApi.call('getSkirmishes', {
                query: { userId: this.userData.user._id, ...e.detail },
            });

            this.skirmishes = items;
            this.count = count;
        } catch (e) {
            // do something with error
        }
    };

    protected render() {
        return html`
            <filter-bar>
                <filter-item href="${this.rootUrl}" filter="">All</filter-item>
                <filter-item href="${this.rootUrl}?type=campaign" filter="campaign">
                    Campaign
                </filter-item>
                <filter-item href="${this.rootUrl}?type=skirmish" filter="skirmish">
                    Skirmish
                </filter-item>
            </filter-bar>

            <div class="card-list">
                ${this.skirmishes.length
                    ? this.skirmishes.map(
                          (skirmish) => html`
                              <skirmish-tile
                                  .data=${skirmish}
                                  urlpattern=${this.rosterUrl}
                              ></skirmish-tile>
                          `,
                      )
                    : html`
                          <slot>
                              <p class="callout">No crews found</p>
                          </slot>
                      `}
            </div>

            ${this.count < this.limit
                ? nothing
                : html`<mow-pagination
                      clickeventname=${SkirmishList.ClickEventName}
                      itemcount=${this.count}
                      limit=${this.limit}
                      offset=${this.offset}
                      rooturl=${this.rootUrl}
                  ></mow-pagination>`}
        `;
    }
}

@customElement('skirmish-tile')
export class SkirmishTile extends LitElement {
    static styles = css`
        :host {
            --co-bg-color: #ccc;
            display: flex;
            flex-direction: column;
            position: relative;
            text-transform: capitalize;
        }

        .card > a {
            flex: 1 1 100%;
            display: flex;
            flex-direction: column;
            padding: 70px 20px;
            color: #333;
            font-size: 1.8rem;
        }

        .card span {
            padding-bottom: 5px;
        }

        .card span:first-child {
            padding-bottom: 15px;
            color: var(--shade-5);
            font-family: 'Oxanium', monospace;
            font-size: 2.6rem;
        }

        .card a:is(:hover, :focus) span:first-child {
            color: rgba(255, 0, 0, 0.8);
        }
    `;

    @property({ attribute: false })
    data: Skirmish;

    @property()
    urlPattern: string = '/:rosterId';

    protected render() {
        return html`
            <div class="card callout">
                <a href="${this.urlPattern.replace(':rosterId', this.data._id)}">
                    <span>${this.data.name}</span>

                    <span>Created: ${time(new Date(this.data.createdOn))}</span>
                    <span>Credits: ${this.data.points}</span>
                </a>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'skirmish-list': SkirmishList;
        'skirmish-tile': SkirmishTile;
    }
}
