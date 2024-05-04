import { SkirmishListView } from '@benjambles/mow-api/src/resources/skirmishes/skirmishes.js';
import '@benjambles/mow-ui/components/filter-bar/filter-bar.js';
import '@benjambles/mow-ui/components/mow-pagination/mow-pagination.js';
import { MowApiInstance, requestContext } from '@benjambles/mow-ui/contexts/request.js';
import { time } from '@benjambles/mow-ui/core.js';
import { callOutStyles } from '@benjambles/mow-ui/styles.js';
import { consume } from '@lit/context';
import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { UserData, userContext } from '../../../../layouts/components/with-user/user.js';
import { SkirmishApi, SkirmishApiInstance } from './apis/skirmish-api.js';

type PaginationDetails = {
    limit: number;
    offset: number;
};

@customElement('skirmish-list')
export class SkirmishList extends LitElement {
    private skirmishApi: SkirmishApiInstance;

    static ClickEventName = 'mow:skirmishlist.paginate';

    static styles = [
        callOutStyles,
        css`
            * {
                box-sizing: border-box;
            }

            .card-list {
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
    accessor rootUrl = '/';

    @property()
    accessor rosterUrl = '/:rosterId';

    @property({ type: Number })
    accessor count: number = 0;

    @property({ type: Number })
    accessor limit: number = 30;

    @property({ type: Number })
    accessor offset: number = 0;

    @consume({ context: userContext, subscribe: true })
    @property({ attribute: false })
    accessor userData: UserData;

    @consume({ context: requestContext, subscribe: true })
    @property({ attribute: false })
    accessor requestManager: MowApiInstance;

    @state()
    accessor skirmishes: SkirmishListView[] = [];

    connectedCallback() {
        super.connectedCallback();

        this.addEventListener(
            SkirmishList.ClickEventName,
            (e: CustomEvent<PaginationDetails>) => {
                e.preventDefault();
                this.fetchSkirmishes(e.detail);
            },
        );

        if (this.requestManager) {
            this.skirmishApi = new SkirmishApi();
            this.skirmishApi.addManager(this.requestManager);
        }
    }

    protected updated(): void {
        if (this.userData?.status === 'logged-in' && !this.skirmishes.length) {
            this.fetchSkirmishes({ limit: this.limit, offset: this.offset });
        }
    }

    private fetchSkirmishes = async (detail: PaginationDetails) => {
        if (!this.skirmishApi) {
            throw new Error('No request manager registered');
        }

        if (!this.userData?.tokens?.access) {
            return;
        }

        try {
            /* TODO: Add game filter - Ben Allen */
            const { count, items } = await this.skirmishApi.call(
                'getSkirmishes',
                {
                    query: { userId: this.userData.user._id, ...detail },
                },
                this.userData.tokens.access,
            );

            this.skirmishes = items;
            this.count = count;
        } catch (e) {
            // do something with error
            console.log(e);
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
                                  updatedOn=${skirmish.updatedOn}
                                  id=${skirmish._id}
                                  name=${skirmish.name}
                                  points=${skirmish.points}
                                  urlPattern=${this.rosterUrl}
                              ></skirmish-tile>
                          `,
                      )
                    : html`<slot><p class="callout">No crews found</p></slot>`}
            </div>

            ${this.count < this.limit
                ? nothing
                : html`<mow-pagination
                      clickEventName=${SkirmishList.ClickEventName}
                      itemCount=${this.count}
                      limit=${this.limit}
                      offset=${this.offset}
                      rootUrl=${this.rootUrl}
                  ></mow-pagination>`}
        `;
    }
}

@customElement('skirmish-tile')
export class SkirmishTile extends LitElement {
    static styles = [
        callOutStyles,
        css`
            :host {
                --co-bg-color: #ccc;
                display: flex;
                flex-direction: column;
                position: relative;
                text-transform: capitalize;
            }

            a {
                flex: 1 1 100%;
                display: flex;
                flex-direction: column;
                padding: 70px 20px;
                color: #333;
                font-size: 1.8rem;
                text-decoration: none;
            }

            .card span {
                padding-bottom: 5px;
            }

            .card span:first-child {
                padding-bottom: 15px;
                color: rgba(255, 0, 0, 0.8);
                font-family: 'Oxanium', monospace;
                font-size: 2.6rem;
            }

            .card:is(:hover, :focus) {
                --co-bg-color: #777;
                color: white;
            }

            .card:is(:hover, :focus) span:first-child {
                color: white;
            }
        `,
    ];

    @property()
    accessor id: string;

    @property()
    accessor name: string;

    @property()
    accessor updatedOn: string;

    @property({ type: Number })
    accessor points: number;

    @property()
    accessor urlPattern: string = '/:rosterId';

    protected render() {
        return this.name
            ? html`
                  <a
                      class="card callout"
                      href="${this.urlPattern.replace(':rosterId', this.id)}"
                  >
                      <span>${this.name}</span>

                      <span>Modified: ${time(new Date(this.updatedOn))}</span>
                      <span>Credits: ${this.points}</span>
                  </a>
              `
            : nothing;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'skirmish-list': SkirmishList;
        'skirmish-tile': SkirmishTile;
    }
}
