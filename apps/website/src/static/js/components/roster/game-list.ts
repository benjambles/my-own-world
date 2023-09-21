import '@benjambles/mow-ui/components/filter-bar/filter-bar.js';
import { PaginationDetails } from '@benjambles/mow-ui/components/mow-pagination/mow-pagination.js';
import { time } from '@benjambles/mow-ui/core.js';
import { consume } from '@lit-labs/context';
import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Game } from '../../../../routes/tools/roster/index.js';
import { GameApi, GameApiInstance } from '../contexts/game.js';
import { MowApiInstance, requestContext } from '../contexts/request.js';
import { UserData, userContext } from '../contexts/user.js';

@customElement('game-list')
export class GameList extends LitElement {
    private gameApi: GameApiInstance;

    static ClickEventName = 'gamelistpaginate';

    static styles = css`
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
    `;

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
    games: Game[] = [];

    connectedCallback() {
        super.connectedCallback();

        this.addEventListener(
            GameList.ClickEventName,
            (e: CustomEvent<PaginationDetails>) => {
                e.preventDefault();

                this.gameApi.call('getGames', {
                    query: { userId: this.userData.user._id, ...e.detail },
                });
            },
        );

        this.gameApi = new GameApi();
        this.gameApi.addManager(this.requestManager);
    }

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
                ${this.games.length
                    ? this.games.map(
                          (game) => html`
                              <game-tile
                                  .data=${game}
                                  urlpattern=${this.rosterUrl}
                              ></game-tile>
                          `,
                      )
                    : html`
                          <slot>
                              <p>No rosters found</p>
                          </slot>
                      `}
            </div>

            ${this.count < this.limit
                ? nothing
                : html`<mow-pagination
                      clickeventname=${GameList.ClickEventName}
                      itemcount=${this.count}
                      limit=${this.limit}
                      offset=${this.offset}
                      rooturl=${this.rootUrl}
                  ></mow-pagination>`}
        `;
    }
}

@customElement('game-tile')
export class GameTile extends LitElement {
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
    data: Game;

    @property()
    urlPattern: string = '/:rosterId';

    protected render() {
        return html`
            <div data-game-type="${this.data.type}" class="card callout">
                <a href="${this.urlPattern.replace(':rosterId', this.data._id)}">
                    <span>${this.data.name}</span>

                    <span>Created: ${time(new Date(this.data.createdOn))}</span>
                    <span>
                        ${this.data.type}:
                        ${this.data.type === 'skirmish'
                            ? `${this.data.points} credits`
                            : nothing}
                    </span>
                </a>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'game-list': GameList;
        'game-tile': GameTile;
    }
}
