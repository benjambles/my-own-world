import { GameResponse } from '@benjambles/mow-api/src/resources/games/data/games.js';
import { MowApiInstance, requestContext } from '@benjambles/mow-ui/contexts/request.js';
import { consume, provide } from '@lit-labs/context';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GameApi, GameApiInstance, gameContext } from './apis/game-api.js';

@customElement('with-game')
export class WithGame extends LitElement {
    static styles = css`
        * {
            box-sizing: border-box;
        }

        :host {
            display: block;
        }
    `;

    private gameApi: GameApiInstance;

    @consume({ context: requestContext, subscribe: true })
    @property({ attribute: false })
    requestManager?: MowApiInstance;

    @provide({ context: gameContext })
    gameData: GameResponse;

    @property()
    gameId: string;

    connectedCallback() {
        super.connectedCallback();

        if (!this.gameId) {
            throw new Error('A game id must be provided');
        }

        if (this.requestManager) {
            this.gameApi = new GameApi();
            this.gameApi.addManager(this.requestManager);

            this.fetchGameData();
        }
    }

    private fetchGameData = async () => {
        if (!this.gameApi) {
            throw new Error('No request manager registered');
        }

        try {
            this.gameData = await this.gameApi.call('getGameById', {
                params: { gameId: this.gameId },
            });
        } catch (e) {
            console.log(e);
        }
    };

    protected render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'with-game': WithGame;
    }
}
