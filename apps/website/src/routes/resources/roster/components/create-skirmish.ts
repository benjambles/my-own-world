import { GameResponse } from '@benjambles/mow-api/src/resources/games/data/games.js';
import '@benjambles/mow-ui/components/form-elements/glow-button/glow-button.js';
import { MowApiInstance, requestContext } from '@benjambles/mow-ui/contexts/request.js';
import { textInput } from '@benjambles/mow-ui/core.js';
import { callOutStyles, inputStyles } from '@benjambles/mow-ui/styles.js';
import { consume } from '@lit/context';
import { LitElement, css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { UserData, userContext } from '../../../../layouts/components/with-user/user.js';
import { gameContext } from './apis/game-api.js';
import { SkirmishApi, SkirmishApiInstance } from './apis/skirmish-api.js';

@customElement('create-skirmish')
export class CreateSkirmish extends LitElement {
    private skirmishApi: SkirmishApiInstance;

    static styles = [
        inputStyles,

        callOutStyles,
        css`
            * {
                box-sizing: border-box;
            }

            :host {
                --_form-padding: var(--form-padding, 35px 20px 30px);
                --_width: var(--cs-width, 100%);
                width: var(--_width);
                display: block;
            }

            form {
                display: flex;
                flex-direction: column;

                overflow: auto;
                color: var(--shade-4);
            }

            glow-button {
                margin: 40px 0 0;
            }

            fieldset {
                border: none;
                padding: var(--_form-padding);
            }

            legend {
                width: 100%;
                border-bottom: 1px dashed #ddd;
                position: relative;
                top: 30px;
                color: #6b6b6b;
                font-family: 'Oxanium';
                font-size: 1.8rem;
                font-variant: small-caps;
            }
        `,
    ];

    @consume({ context: requestContext, subscribe: true })
    @property({ attribute: false })
    accessor requestManager: MowApiInstance;

    @consume({ context: userContext, subscribe: true })
    @property({ attribute: false })
    accessor userData: UserData;

    @consume({ context: gameContext, subscribe: true })
    @property({ attribute: false })
    accessor gameData: GameResponse;

    @property()
    accessor rosterUrl: string = '';

    @property({ type: Boolean })
    accessor isModal = false;

    @query('form')
    accessor formElem: HTMLFormElement;

    connectedCallback(): void {
        super.connectedCallback();

        if (this.requestManager) {
            this.skirmishApi = new SkirmishApi();
            this.skirmishApi.addManager(this.requestManager);
        }
    }

    private async onSubmit(e: SubmitEvent) {
        e.preventDefault();

        const formData = new FormData(this.formElem);

        if (!this.skirmishApi) {
            throw new Error('No request manager registered');
        }

        if (!this.userData) {
            throw new Error('You must be logged in');
        }

        if (!this.gameData) {
            throw new Error('No game found');
        }

        try {
            const result = await this.skirmishApi.call(
                'createSkirmish',
                {
                    body: {
                        description: formData.get('description') as string,
                        game: {
                            _id: this.gameData._id,
                            name: this.gameData.name,
                            version: this.gameData.version,
                        },
                        name: formData.get('name') as string,
                        points: 0,
                        type: 'skirmish',
                    },
                },
                this.userData.tokens.access,
            );

            window.location.replace(this.rosterUrl.replace(':rosterId', result._id));
        } catch {
            // Render errors
        }
    }

    protected render() {
        return html`
            <form action="/roster/create-skirmish" method="post" @submit=${this.onSubmit}>
                <fieldset>
                    <legend>Mission Information</legend>

                    ${textInput({
                        id: 'name',
                        label: 'Squad Name',
                        required: true,
                        type: 'text',
                    })}

                    <label for="description">Notes</label>
                    <div class="input-wrapper">
                        <div class="text-input">
                            <textarea id="description" name="description"></textarea>
                        </div>
                    </div>

                    <glow-button class="large">Submit</glow-button>
                </fieldset>
            </form>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'create-skirmish': CreateSkirmish;
    }
}
